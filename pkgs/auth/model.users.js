var qr=require("n-qr")
var name="sys.auth_users";
qr.model(name,[
    {
        fields:["username"],
        options:qr.IndexTypes.unique
    },{
        fields:["email"],
        options:qr.IndexTypes.unique
    
    }
    
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
    sign_in:qr.embeded(qr.FieldTypes.Array,[
        "time",
        "session_id"
    ],{
        time:qr.FieldTypes.Date,
        session_id:qr.FieldTypes.String
    }),
    
    change_password_on:qr.embeded(qr.FieldTypes.Array,[],qr.FieldTypes.Date)
})
module.exports=name;