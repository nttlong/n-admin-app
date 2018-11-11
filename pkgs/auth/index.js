try {
    require("./model.users");
} catch (ex) {
    console.log("import model.user error",ex);
}
try {
    require("./model.apps");
} catch (ex) {
    console.log("import model.apps error", ex);
}
try {
    require("./model.roles");
} catch (ex) {
    console.log("import model.roles error", ex);
}

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