var sync=require("q-sync");
var query=require("n-qr").query;
var modelApps=require("./model.apps");
function AppInfo() {

}
AppInfo.prototype.name="";
AppInfo.prototype.code = "";
function ViewInfo(){

}
ViewInfo.prototype.name="";
ViewInfo.prototype.code = "";
AppInfo.prototype.view=ViewInfo;
/**
 * 
 * @param {*} db 
 * @param {AppInfo} data
 * @param {*} cb 
 */
function registeView(db,data,cb){
    return sync(function(cb){
        var app = query(db, modelApps).project({
            code:1,
            name:1
        }).match("code=={0}",data.code)
        .item();
        if(!app){
           ret= query(db, modelApps).insert({
                code:data.code,
                name:data.name,
                created_on:new Date(),
                created_by:"application",
                views:[{
                    code:data.view.code,
                    name: data.view.name,
                    created_on: new Date(),
                    created_by: "application"
                }]
            }).commit();
            cb(null,ret);
        }
        else {
            var item=query(db,modelApps)
            .match("code=={0}",data.code)
            .project({
                indexOfView:"indexOfArray(views.code,{0})"
            },data.view.code).item();
            var setter={};
            setter["views." + item.indexOfView]=data.view;
            var ret=query(db,modelApps).where("code=={0}",data.code)
                .set(setter).commit();
            cb(null,ret);

        }
    }).call(cb);

}
module.exports=registeView;