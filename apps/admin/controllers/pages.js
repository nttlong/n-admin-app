module.exports=(context,req,res)=>{
    if (!req.getUser()) {
        res.redirect(context.getAppUrl("login"));
        return;
    }
    var x=context.getCurrentUrl();
    context.htmlPagePath="pages/"+req.params.page+".html";
}
