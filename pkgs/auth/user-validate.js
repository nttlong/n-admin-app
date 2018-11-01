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
    if(data.password){
        data.pass_saft=bcrypt.genSaltSync(Math.random()*8+1);
        data.hash_password=bcrypt.hashSync(data.password,data.pass_saft);
        delete data.password;
    }
    return sync.exec(function(cb){
       qr(db,modelName).insert(data).commit(cb);
    },cb);
   
}