var qr=require("n-qr")
var name="sys.auth_users"
qr.model(name,[
    qr.createIndexInfo({username:1},{unique:true}),
    qr.createIndexInfo({email:1},{unique:true}),
],[
    "username",
    "email",
    "hash_password",
    "created_on",
    "created_by"

],{
    username:qr.FieldTypes.String,
    email:qr.FieldTypes.String,
    hash_password:qr.FieldTypes.String,
    description:qr.FieldTypes.String,
    created_on:qr.FieldTypes.Date,
    created_by:qr.FieldTypes.String
})
module.exports=name;