const express = require("express")
const UserController = require("../controllers/userController")
const  authentication  = require("../middlewares/authentication")
const routerUser = express.Router()

routerUser.post("/register",UserController.register)
routerUser.post("/login",UserController.login)
routerUser.delete("/logout",authentication, UserController.logout)
routerUser.get("/info",authentication, UserController.getInfo)

module.exports = routerUser