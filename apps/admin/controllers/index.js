module.exports=function(context,req,res){
  if(!req.getUser()){
    res.redirect(context.getAppUrl("login"));
   return;
  }
  var x=context.getAppUrl();
  context.menu=require("./../libs/menu")
};