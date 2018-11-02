module.exports=function(context,req,res){
  var x=context.getAppUrl();
  context.menu=require("./../libs/menu")
};