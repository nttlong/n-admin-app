var qr=require("n-qr").query;
var sync =require("q-sync");
var bcrypt=require("bcrypt");
var modelName=require("./model.users");
/**
 * 
 * @param {*} db 
 * @param {{username:string,password:string,email:string,created_by?:string}} data 
 * @param {Function} cb 
 */
module.exports=function(db,data,cb){
    if(data.password){
        data.pass_saft=bcrypt.genSaltSync(Math.random()*8+1);
        data.hash_password=bcrypt.hashSync(data.password,data.pass_saft);
        delete data.password;
    }
    if(!data.created_by){
        data.created_by="application"
    }
    return sync.exec(function(cb){
       qr(db,modelName).insert(data).commit(cb);
    },cb);
   
}