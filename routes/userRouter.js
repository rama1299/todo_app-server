const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");

const userController = require("../controllers/userController.js");

router.get("/api/user", authentication, userController.findUserLogged);
router.put("/api/user", authentication, userController.updateUserLogged);

module.exports = router;
