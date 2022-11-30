const express = require("express");
const BloodBanksController = require("./blood_banks.controller");

const router = express.Router();

router.get("/blood-banks", BloodBanksController.getBloodBanks);
router.post("/blood-banks", BloodBanksController.createBloodBank);

module.exports = router;
