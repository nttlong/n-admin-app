var query=require("n-qr").query;
var db=require("quicky").getConnect();
var roleModels=require("./../../../pkgs/auth/model.roles");
module.exports=(context,req,res)=>{
    return {
        ajax:{
            getItems:(data)=>{
               
                var items=query(db,roleModels).project({
                    code:1,
                    name:1,
                    created_on:1,
                    created_by:1,
                    modifie_on:1,
                    modified_by:1
                }).items();
               
                return items;
            }
        }
    }
}