// JavaScript source code
var modelName = require("./model.users");
var sync = require("q-sync");
var qr = require("n-qr");
/**
 * get user by username
 * @param {any} db
 * @param {string} username
 * @param {any} cb
 */
module.exports = (db, username, cb) => {
    return sync(function (done) {
        var user = qr.query(db, modelName).match("username=={0}", username)
            .project({
                username: 1,
                email: 1,
                created_on: 1,
                created_by:1
            })
            .item();
        done(null,user);
    }).call(cb);
}