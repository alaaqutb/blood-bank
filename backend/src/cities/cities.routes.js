const express = require("express");
const CitiesController = require("./cities.controller");

const router = express.Router();

router.get("/cities", CitiesController.getCities);
router.post("/cities", CitiesController.createCity);

module.exports = router;
