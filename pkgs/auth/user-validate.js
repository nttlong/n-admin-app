var qr=require("n-qr").query;
var sync =require("q-sync");
var bcrypt=require("bcrypt");
var modelName=require("./model.users");
function info(){}
info.prototype.username="";
info.prototype.password="";
/**
 * 
 * @param {*} db 
 * @param {info} data 
 * @param {function(cb){}} cb 
 */
module.exports = function (db, data, cb) {
    var record = {};
    var caller = sync(cb => {
        require("./user-get")(db, "sys", function (e, r) {
            if (e) cb(e);
            else {
                record.sysUser = r;
                cb();
            }
        });
    }, cb => {
        if (!record.sysUser) {
            require("./user-create")(db, {
                username: "sys",
                password: "sys",
                email: ""
            }, cb);
        }
        else {
            cb();
        }
    }, function (cb) {
        var ret = qr(db, modelName).match("username=={0}", data.username).project({
            hash_password: 1,
            pass_salt: 1
        }).item((e, r) => {
            record.ok = (r) && (bcrypt.hashSync(data.password, r.pass_salt) === r.hash_password);
            cb();
        });

        });
    if (cb) {
        caller.call((e, r) => {
            if (cb) {
                cb(null, record.ok);
            }
        });
    }
    else {
        caller.call();
        return record.ok;
    }

};