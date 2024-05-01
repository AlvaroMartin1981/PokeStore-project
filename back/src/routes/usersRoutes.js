const express = require("express")
const UserController = require("../controllers/userController")
const { authentication, isAdmin } = require('../middlewares/authentication');
const routerUser = express.Router()

routerUser.post("/register",UserController.register)
routerUser.post("/login",UserController.login)
routerUser.get("/user", UserController.getInfo);
routerUser.delete("/logout",authentication, UserController.logout)
routerUser.get("/info",authentication, UserController.getInfo)
routerUser.post("/admin/create", authentication, isAdmin, UserController.createAdmin)
routerUser.get("/admins", UserController.checkAdminExistence)


module.exports = routerUser