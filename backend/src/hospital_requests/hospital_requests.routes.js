const express = require("express");
const HospitalRequestsController = require("./hospital_requests.controller");

const router = express.Router();

router.post("/hospital-requests", HospitalRequestsController.createHospitalRequests);


module.exports = router;