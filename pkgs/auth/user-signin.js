var qr=require("n-qr");
var sync=require("q-sync");
var userModel=require("./model.users");
/**
 * 
 * @param {*} db 
 * @param {{username:string,sessionId:string,language:string}} data 
 * @param {*} cb 
 */
function signIn(db,data,cb){
     return sync(function(cb){
         qr.query(db,userModel).where("username=={0}",data.username)
         .push({
             sign_in:{
                 time:new Date(),
                 session_id:data.sessionId
             }
         }).commit(cb);
     }).call(cb);
}
module.exports = signIn