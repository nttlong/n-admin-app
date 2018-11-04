var dbUtil = require("n-qr");
var modelName = "sys.roles";
dbUtil.model(modelName, [
    {
        fields: { code: 1 },
        options: dbUtil.IndexTypes.unique
    }
], [
        "code",
        "name",
        "created_on",
        "created_by"

    ], {
        code: dbUtil.FieldTypes.String,
        name: dbUtil.FieldTypes.String,
        description: dbUtil.FieldTypes.String,
        users: dbUtil.embeded(
            dbUtil.FieldTypes.Array,
            ["username", "created_on", "created_by"],
            {
                username: dbUtil.FieldTypes.String,
                description: dbUtil.FieldTypes.String,
                created_on: dbUtil.FieldTypes.Date,
                created_by: dbUtil.FieldTypes.String,
                modified_on:dbUtil.FieldTypes.Date,
                modified_by: dbUtil.FieldTypes.String
            }
        ),
        views:dbUtil.embeded(dbUtil.FieldTypes.Array,[
            "code",
            "privileges"
        ],{
                code: dbUtil.FieldTypes.String,
            privileges:dbUtil.embeded(dbUtil.FieldTypes.Array,
                    [],
                    dbUtil.FieldTypes.String
                    ),
                created_on: dbUtil.FieldTypes.Date,
                created_by: dbUtil.FieldTypes.String,
        }),
        created_on: dbUtil.FieldTypes.Date,
        created_by: dbUtil.FieldTypes.String,
        modified_on: dbUtil.FieldTypes.Date,
        modified_by: dbUtil.FieldTypes.String

    });
module.exports = modelName;