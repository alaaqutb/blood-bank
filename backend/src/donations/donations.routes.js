const express = require("express");
const DonationsController = require ("./donations.controller");

const router = express.Router();

// one end point to register the user and create the donation
// the user doesn't have to make more than one action to donate
router.post("/donate", DonationsController.donate);

module.exports = router;
