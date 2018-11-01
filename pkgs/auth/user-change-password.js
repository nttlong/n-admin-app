var qr = require("n-qr").query;
var sync = require("q-sync");
var bcrypt = require("bcrypt");
var modelName = require("./model.users");
var userValidate=require("./user-validate");
/**
 * 
 * @param {*} db 
 * @param {{username:string,password:string,old_password:string}} data 
 * @param {Function} cb 
 */
module.exports = function (db, data, cb) {
    var user=undefined;
    var retError=undefined;
    try {
        var ret = sync(cb => {
            if (!data.old_password) {
                retError = {
                    code: "MISS",
                    field: ["old_password"],
                    message: "Please, enter your old passworld"
                };
                cb(retError);
            }
            else {
                cb();
            }

        }, cb => {
            if (!data.password) {
                retError = {
                    code: "MISS",
                    field: ["password"],
                    message: "Please, enter your old password"
                };
                cb(retError);
            }
            else {
                cb();
            }
        }, cb => {
            if (!data.username) {
                retError = {
                    code: "MISS",
                    field: ["username"],
                    message: "Please, enter your old username"
                };
                cb(retError);
            }
            else{
                cb();
            }
        }, cb => {
            userValidate(db, {
                username: data.username,
                password: data.old_password
            }, (err, result) => {
                if (!result) {
                    retError = {
                        code: "INVL",
                        field: ["old_password", "username"],
                        message: "Username or old password is incorrect"
                    };
                    cb(retError);
                }
                else {
                    cb();
                }
            })
        }, cb => {
            var salt = bcrypt.genSaltSync(Math.random() * 8 + 1);
            var hashPassword = bcrypt.hashSync(data.password, salt);
            var ret = qr(db, modelName).where("username=={0}", data.username)
                .set({
                    hash_password: hashPassword,
                    pass_saft: salt
                }).push({
                    change_password_on: new Date()
                }).commit();
            if (ret.error) {
                retError=ret.error;
                cb(ret.error);
            }
            else {
                cb(null, rer.data);
            }
        }).call(cb);
        var x = ret;
    } catch (error) {
        if(cb){
            cb(null,{error:retError})
        }
        else {
            return {
                error: retError
            }
        }
    }
    

}