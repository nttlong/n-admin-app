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
    created_by:qr.FieldTypes.String,
    sign_in:qr.FieldTypes.Array,
    "sign_in.time":qr.FieldTypes.Date,
    "sign_in.session_id":qr.FieldTypes.String,
        change_password_on:qr.FieldTypes.Array
})
module.exports=name;