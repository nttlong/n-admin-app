var dbUtil = require("n-qr");
var modelName = "sys.roles";
dbUtil.model(modelName, [
    {
        fields: { code: 1 },
        options: {
            unique:true
        }
    }
],  {
        required: [
            "code",
            "name",
            "created_on",
            "created_by"

        ],
        properties: {
            code:{bsonType:dbUtil.BSONTypes.String},
            name:{bsonType:dbUtil.BSONTypes.String},
            description:{bsonType:dbUtil.BSONTypes.String},
            users:{
                bsonType:dbUtil.BSONTypes.Array,
                items:{
                    required: ["username", "created_on", "created_by"],
                    properties:{
                        username:{bsonType:dbUtil.BSONTypes.String},
                        description:{bsonType:dbUtil.BSONTypes.String},
                        created_by:{bsonType:dbUtil.BSONTypes.String},
                        created_on:{bsonType:dbUtil.BSONTypes.Date},
                        modified_by:{bsonType:dbUtil.BSONTypes.String},
                        modified_on:{bsonType:dbUtil.BSONTypes.Date}
                    }
                }
            },
            views:{
                bsonType:dbUtil.BSONTypes.Array,
                required: ["code","privileges"],
                properties:{
                    code:{bsonType:dbUtil.BSONTypes.String},
                    privileges:{
                        bsonType:dbUtil.BSONTypes.Array,
                        items:{
                            bsonType:dbUtil.BSONTypes.String
                        }
                    }, 
                    created_by: { bsonType: dbUtil.BSONTypes.String },
                    created_on: { bsonType: dbUtil.BSONTypes.Date },
                    modified_by: { bsonType: dbUtil.BSONTypes.String },
                    modified_on: { bsonType: dbUtil.BSONTypes.Date }
                }
            },
            created_by: { bsonType: dbUtil.BSONTypes.String },
            created_on: { bsonType: dbUtil.BSONTypes.Date },
            modified_by: { bsonType: dbUtil.BSONTypes.String },
            modified_on: { bsonType: dbUtil.BSONTypes.Date }
        }
    });
module.exports = modelName;