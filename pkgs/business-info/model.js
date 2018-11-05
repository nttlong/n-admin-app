var mUtils=require("n-qr");
var modelName = "sys.business_info"
mUtils.model(modelName,[
    
],[
  
],{
   
    site:mUtils.embeded(mUtils.FieldTypes.Object,[
        "title", "key_words", "name", "mobile", "address","email"
    ],{
            name: mUtils.embeded(mUtils.FieldTypes.Object, [

            ], {
                    en: mUtils.FieldTypes.String,
                    vn: mUtils.FieldTypes.String
                }),
            mobile: mUtils.FieldTypes.String,
            address: mUtils.FieldTypes.String,
            email: mUtils.FieldTypes.String,
        title:mUtils.FieldTypes.Object,
        description:mUtils.FieldTypes.String,
        key_words:mUtils.FieldTypes.String

    }),
    settings:mUtils.embeded(mUtils.FieldTypes.String,[
        "server",
        "username",
        "password",
        "port",
        "use_default_credentials",
        "is_use_ssl",
        "email"


    ],{
        server:mUtils.FieldTypes.String,
        username:mUtils.FieldTypes.String,
        password:mUtils.FieldTypes.String,
        port:mUtils.FieldTypes.Int32,
        is_use_ssl :mUtils.FieldTypes.Boolean,
        use_default_credentials :mUtils.FieldTypes.Boolean,
        email:mUtils.FieldTypes.String

    })
    

})
module.exports=modelName;