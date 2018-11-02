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
        data.pass_salt=bcrypt.genSaltSync(Math.random()*8+1);
        data.hash_password=bcrypt.hashSync(data.password,data.pass_salt);
        delete data.password;
    }
    if(!data.created_by){
        data.created_by="application"
    }
    data.created_on= new Date();
    return sync(function(cb){
      return qr(db,modelName).insert(data).commit(cb);
    }).call(cb);
   
}