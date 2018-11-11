var dbUtil=require("n-qr");
var modelName="sys.apps";
dbUtil.model(modelName,[
    {
        fields:{code:1},
        options:{
            unique:true
        }
    }
],{
        required: [
            "code",
            "created_on",
            "created_by"

        ],
        properties:{
            code: { bsonType: dbUtil.BSONTypes.String},
            name: { bsonType: dbUtil.BSONTypes.String},
            description: { bsonType: dbUtil.BSONTypes.String},
                views: {
                    bsonType:dbUtil.BSONTypes.Array,
                    items:{
                        required:[
                            "code",
                            "name",
                            "created_on",
                            "created_by"
                        ],
                        properties:{
                            code:{bsonType:dbUtil.BSONTypes.String},
                            name:{bsonType:dbUtil.BSONTypes.String},
                            description:{bsonType:dbUtil.BSONTypes.String},
                            created_by:{bsonType:dbUtil.BSONTypes.String},
                            created_on:{bsonType:dbUtil.BSONTypes.Date},
                            modified_by:{bsonType:dbUtil.BSONTypes.String},
                            modified_on:{bsonType:dbUtil.BSONTypes.Date}
                        }

                    }
                },
            created_by: { bsonType: dbUtil.BSONTypes.String},
                created_on:{bsonType:dbUtil.BSONTypes.Date},
            modified_by: { bsonType: dbUtil.BSONTypes.String},
                modified_on:{bsonType:dbUtil.BSONTypes.Date}
                
                
        }
        
    });
module.exports=modelName;