module.exports=(context,req,res)=>{
    var x=context.getCurrentUrl();
    context.htmlPagePath="pages/"+req.params.page+".html";
}
