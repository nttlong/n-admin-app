var q = require("quicky");
var cnn = "mongodb://root:123456@localhost:27017/hrm";
q.language.setConfig(cnn,"sys_language");
var app = q.apps;
app.setSecretKey("sas03udh74327%$63283");
app.setCacheMode(true);
app.setCompressMode(false);
app.sessionCacheUseMemCache(true);
app.sessionCacheUseMemCache(false);
app.load(
    {
        name:"admin",
        hostDir:"",
        dir:"apps/admin",
        isAutoRoute:true
    }
).listen(3000,function(){
    console.log("app start  at port 3000");
});