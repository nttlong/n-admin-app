var auth=require("./../../../pkgs/auth");
var db=require("quicky").getConnect();
var x=1;
module.exports=(context,req,res)=>{
    return {
        ajax:{
            get:(data)=>{
                var user=auth.users.get(db,req.getUser().username);

                return user;
            },

        }
    }
}