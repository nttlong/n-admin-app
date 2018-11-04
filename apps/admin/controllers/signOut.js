module.exports=(context,req,res)=>{
    req.setUser(undefined);
    res.redirect(context.getAppUrl());
}