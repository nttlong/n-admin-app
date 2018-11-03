require("./model.users");

module.exports = {
    users: {
        create: require("./user-create"),
        validate: require("./user-validate"),
        signIn:require("./user-signin"),
        get: require("./user-get")

    }
}