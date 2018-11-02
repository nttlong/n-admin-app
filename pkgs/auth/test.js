var fn=require("./user-create");
var fn1=require("./user-change-password");
var fn2=require("./user-validate");

var db=require("mongoose").createConnection("mongodb://localhost:27017/test1");
var ret=fn(db,{username:"admin",password:"admin",email:"nttlong@gmail.com"});
var ret=fn2(db,{password:"admin",username:"admin"});
var ret= fn1(db,{
    old_password:"sys",
    username:"sys",
    password:"123456"
});
console.log(ret);