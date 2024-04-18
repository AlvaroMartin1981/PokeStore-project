const express = require("express")
const UserController = require("../controllers/userController")
const { authentication } = require("../middleware/authentication")
const router = express.Router()

router.post("/register",UserController.register)
router.post("/login",UserController.login)
router.delete("/logout",authentication, UserController.logout)
router.get("/info",authentication, UserController.getInfo)

module.exports = router