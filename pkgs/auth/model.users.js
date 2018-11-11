var qr=require("n-qr")
var name="sys.auth_users";
qr.model(name,[
    {
        fields:{username:1},
        options:{
            unique:true
        }
    },{
        fields:{email:1},
        options:{
            unique:true
        }
    }
],{
    required:[
        "username",
        "email",
        "hash_password",
        "created_on",
        "created_by"
    ],
    properties:{
        username:{bsonType:qr.BSONTypes.String},
        email:{bsonType:qr.BSONTypes.String},
        hash_password:{bsonType:qr.BSONTypes.String},
        description:{bsonType:qr.BSONTypes.String},
        created_by:{bsonType:qr.BSONTypes.String},
        created_on:{bsonType:qr.BSONTypes.Date},
        sign_in:{
            bsonType:qr.BSONTypes.Array,
            required:["time","session_id"],
            properties:{
                time:{bsonType:qr.BSONTypes.Date},
                session_id:{bsonType:qr.BSONTypes.String}
            }
        },
        change_password_on:{
            bsonType:qr.BSONTypes.Array,
            items:{
                bsonType:qr.BSONTypes.Date
            }
        }
    }
});
    
 
module.exports=name;