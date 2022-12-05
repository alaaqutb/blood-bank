const express = require("express");
const DonationsController = require("./donations.controller");
const LoginController = require("../users/login.controller");

const router = express.Router();

// one end point to register the user and create the donation
// the user doesn't have to make more than one action to donate
router.post("/donate", DonationsController.donate);
router.put(
  "/donate",
  LoginController.authenticateBloodBankUser,
  DonationsController.updateDonations
);
router.get(
  "/donors",
  LoginController.authenticateBloodBankUser,
  DonationsController.getPendingDonations
);

router.get("/donor/:id", DonationsController.getDonor);

module.exports = router;
