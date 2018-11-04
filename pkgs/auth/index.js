require("./model.users");
require("./model.apps");
module.exports = {
    users: {
        create: require("./user-create"),
        validate: require("./user-validate"),
        signIn:require("./user-signin"),
        get: require("./user-get")

    },
    apps:{
        registerView:require("./apps-register-view")
    }
}