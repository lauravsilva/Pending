var controllers = require('./controllers');
var mid = require('./middleware');

var router = function(app) {
    app.get("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.post("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
    app.get("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
    app.post("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
    app.get("/logout", mid.requiresLogin, controllers.Account.logout);
    app.get("/maker", mid.requiresLogin, controllers.Task.makerPage);
    app.post("/maker", mid.requiresLogin, controllers.Task.make);
    app.get("/removeTask/:id", mid.requiresLogin, controllers.Task.removeTask);
    app.get("/display", mid.requiresLogin, controllers.Task.displayPage);
    app.get("/profile", mid.requiresLogin, controllers.Account.profilePage);
    app.get("/", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;