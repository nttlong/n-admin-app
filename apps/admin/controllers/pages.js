var auth=require("./../../../pkgs/auth");
var db=require("quicky").getConnect();
module.exports=(context,req,res)=>{
    var retRegis=auth.apps.registerView(db,{
        code:"admin",
        name:"Administrator",
        view:{
            code:req.baseUrl,
            name:req.baseUrl
        }
    })
    if (!req.getUser()) {
        res.redirect(context.getAppUrl("login"));
        return;
    }
    var x=context.getCurrentUrl();
    context.htmlPagePath="pages/"+req.params.page+".html";
}
