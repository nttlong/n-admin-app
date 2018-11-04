var dbUtil=require("n-qr");
var modelName="sys.apps";
dbUtil.model(modelName,[
    {
        fields:{code:1},
        options:dbUtil.IndexTypes.unique
    }
],[
    "code",
    "created_on",
    "created_by"
    
],{
        code:dbUtil.FieldTypes.String,
        name:dbUtil.FieldTypes.String,
        description:dbUtil.FieldTypes.String,
        views:dbUtil.embeded(
            dbUtil.FieldTypes.Array,
            ["code", "name", "created_on","created_by"],
            {
                code:dbUtil.FieldTypes.String,
                name:dbUtil.FieldTypes.String,
                description:dbUtil.FieldTypes.String,
                created_on: dbUtil.FieldTypes.Date,
                created_by: dbUtil.FieldTypes.String,
                modified_on: dbUtil.FieldTypes.Date,
                modified_by: dbUtil.FieldTypes.String
            }
        ),
        created_on:dbUtil.FieldTypes.Date,
        created_by:dbUtil.FieldTypes.String,
        modified_on: dbUtil.FieldTypes.Date,
        modified_by: dbUtil.FieldTypes.String

});
module.exports=modelName;