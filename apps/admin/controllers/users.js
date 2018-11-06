var query=require("n-qr").query;
var db=require("quicky").getConnect();
var userModelName=require("./../../../pkgs/auth/model.users");
module.exports=(context,req,res)=>{
    return {
        ajax:{
            getItems:(data)=>{
                var ret=query(db,userModelName).project({
                    username:1,
                    first_name:1,
                    last_name:1,
                    email:1,
                    description:1,
                    created_on:1,
                    created_by:1,
                    modified_on:1,
                    modified_by:1
                }).items();
                return ret;
            }
        }
    }
}