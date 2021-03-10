const userRoute = require("./user.route");
const registerRoute = require("./register.route");
const express = require("express");
const router = express.Router();

router.use("/user", userRoute);
router.use("/register", registerRoute);

module.exports = router;
