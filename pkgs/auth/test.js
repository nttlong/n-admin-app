var fn=require("./user-validate");
var db=require("mongoose").createConnection("mongodb://localhost:27017/test1")
var ret= fn(db,{
    username:"sys",
    password:"sys",
    email:"zugeliang2000@gmail.com",
    created_on:new Date(),
    created_by:"application"
});
console.log(ret);