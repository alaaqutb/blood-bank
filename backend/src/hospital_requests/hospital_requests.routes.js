const express = require("express");
const HospitalRequestsController = require("./hospital_requests.controller");
const LoginController = require("../users/login.controller");
const router = express.Router();

router.post(
  "/hospital-requests",
  LoginController.authenticateHospitalUser,
  HospitalRequestsController.createHospitalRequests
);
router.get(
  "/hospital-requests",
  LoginController.authenticateHospitalUser,
  HospitalRequestsController.getHospitalsRequests
);

module.exports = router;
