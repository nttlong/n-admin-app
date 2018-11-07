module.exports=function(context,req,res){
  if(!req.getUser()){
    res.redirect(context.getAppUrl("login"));
   return;
  }
  var x=context.getAppUrl();
  context.menu = [
    {
      caption: "Administrator",
      items: [
        {
          caption: "users",
          page: "pages/users"
        },{
          caption:"Roles",
          page:"pages/roles"
        }
      ]

    },{
      caption:"Resource",
      items:[
        {
          caption:"Language",
          page:"pages/resource.languages"
        },{
          caption:"Reports",
          page:"pages/resource.Reports"
        }
      ]
    },{
      caption:"Settings",
        items:[{
          caption: "Business info",
          page: "pages/system.business.info"
        },{
          caption:"Email",
            page: "pages/system.email"

        }]
    }
  ];
};