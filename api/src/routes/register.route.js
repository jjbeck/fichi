const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register.controller");

router.post("/authenticate", registerController.authenticate);
router.post("/authorize", registerController.authorize);
router.post("/signout", registerController.signOut);
router.post("/unregister", registerController.unregister);


module.exports = router;