const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController.js");

router.post("/api/register", authController.register);
router.post("/api/login", authController.login);
router.put("/api/forgot-password", authController.forgotPassword);

module.exports = router;
