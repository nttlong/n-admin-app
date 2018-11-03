// JavaScript source code
var auth = require("./../../../pkgs/auth");
var db = require("quicky").getConnect();
module.exports = (context, req, res) => {
 
    return {
        post: (data) => {
            var ret = auth.users.validate(db, {
                username: data.username,
                password: data.password
            });

            if (ret) {
                var ret=auth.users.signIn(db,{
                    username:data.username,
                    sessionId:req.sessionID
                })
                var user=auth.users.get(db,data.username);
                req.setUser(user);
                res.redirect(context.getAppUrl());

            }
            else {
                context.error = context.getAppRes("Login fail");
            }
            console.log(data);
        }
    };
};