var express = require('express');
var router = express.Router();
const userRouter = require("./user");
const authRouter = require('./auth');
const categoryRouter = require("./category");
const productRouter = require("./product");
const cartRouter = require("./cart")
const orderRouter = require("./order")
const roleRouter = require("./role");
const permissionRouter = require("./permission");
const rolePermissionRouter = require("./rolePermission");
const reportRouter = require("./report")

router.use("/user", userRouter)
router.use("/auth", authRouter)
router.use("/categories", categoryRouter)
router.use("/products", productRouter)
router.use("/role", roleRouter)
router.use("/permission", permissionRouter)
router.use("/role-permission", rolePermissionRouter)
router.use("/carts", cartRouter)
router.use("/orders", orderRouter)
// router.use("/trnsactions")
router.use("/reports", reportRouter)


module.exports = router;
