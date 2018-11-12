var mUtils=require("n-qr");
var BSONTypes=require("n-qr").BSONTypes;
var modelName = "sys.business_info"
mUtils.model(modelName,[
    
],{
    properties:{
        site:{
            bsonType:BSONTypes.Object,
            required: ["title", "key_words", "name", "mobile", "address", "email"],
            properties:{
                title: { bsonType: BSONTypes.String},
                key_words: { bsonType: BSONTypes.String},
                name:{bsonType:BSONTypes.String},
                address:{bsonType:BSONTypes.String},
                email:{bsonType:BSONTypes.String},
                description:{bsonType:BSONTypes.String}
            }
        },
        settings:{
            bsonType:BSONTypes.Object,
            email:{
                bsonType:BSONTypes.Object,
                required: [
                    "server",
                    "username",
                    "password",
                    "port",
                    "use_default_credentials",
                    "is_use_ssl",
                    "email"
                ],
                properties: {
                    email: { bsonType: BSONTypes.String },
                    username: { bsonType: BSONTypes.String },
                    password: { bsonType: BSONTypes.String },
                    port: { bsonType: BSONTypes.Int32 },
                    is_use_ssl: { bsonType: BSONTypes.Boolean },
                    email: { bsonType: BSONTypes.String }
                }

            }
           
        }
    }
});
module.exports=modelName;