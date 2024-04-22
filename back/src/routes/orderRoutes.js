const express = require("express")
const OrderController = require("../controllers/orderController")
const authentication = require("../middlewares/authentication")
const routerOrder = express.Router()

routerOrder.post("/",authentication, OrderController.create)
routerOrder.put("/id/:_id",authentication,OrderController.update)

module.exports = routerOrder