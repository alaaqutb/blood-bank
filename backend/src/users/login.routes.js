const express = require("express");
const LoginController = require("./login.controller");

const router = express.Router();

router.post("/login", LoginController.login);

module.exports = router;
