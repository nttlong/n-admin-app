module.exports=(context,req,res)=>{
    context.htmlPagePath="pages/"+req.params.page+".html";
}
