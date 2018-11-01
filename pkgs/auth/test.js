var fn=require("./user-create");
var fn1=require("./user-change-password");
var db=require("mongoose").createConnection("mongodb://localhost:27017/test1")
var ret= fn1(db,{
    old_password:"x",
    username:"sys",
    password:"123456"
});
console.log(ret);