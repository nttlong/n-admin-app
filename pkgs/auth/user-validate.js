var qr=require("n-qr").query;
var sync =require("q-sync");
var bcrypt=require("bcrypt");
var modelName=require("./model.users");
function info(){}
info.prototype.username="";
info.prototype.password="";
/**
 * 
 * @param {*} db 
 * @param {info} data 
 * @param {function(cb){}} cb 
 */
module.exports=function(db,data,cb){
    return sync(function(cb){
       var ret=qr(db,modelName).match("username=={0}",data.username).project({
           hash_password:1,
           pass_salt:1
       }).item();
       if(ret==null) return false;
        var p = bcrypt.hashSync(data.password, ret.pass_salt);
        cb(null,p===ret.hash_password);
    }).call(cb);
   
}