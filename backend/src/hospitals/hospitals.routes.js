const express = require("express");
const HospitalsController = require("./hospitals.controller");

const router = express.Router();

router.get("/hospitals", HospitalsController.getHospitals);
router.post("/hospitals", HospitalsController.createHospital);

module.exports = router;
