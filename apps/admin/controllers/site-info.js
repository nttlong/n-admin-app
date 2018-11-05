var businessInfo=require("./../../../pkgs/business-info");
var db=require("quicky").getConnect();
module.exports=(context,req,res)=>{
    return {
        ajax:{
            get:(data)=>{
                return businessInfo.site.get(db)
            },
            save:(data)=>{
                return businessInfo.site.save(db,data)
            }
        }
    }
    debugger;
}