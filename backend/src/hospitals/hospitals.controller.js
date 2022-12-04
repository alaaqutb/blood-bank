const CitiesModel = require("../cities/cities.model");
const HospitalsModel = require("./hospitals.model");
const BloodBanksModel = require("../blood_banks/blood_banks.model");
const DistanceController = require("../distances/distances.controller");

class HospitalsController {
  static async getHospitals(req, res, next) {
    try {
      const data = await HospitalsModel.getHospitals();
      res.json({
        message: "Hospitals are found successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async createHospital(req, res, next) {
    try {
      const { name, city_id } = req.body;
      const { insertId } = await HospitalsModel.createHospital({
        name,
        city_id,
      });
      // 1. get this hospital data (long, lat, id)
      const { longitude, latitude } = await CitiesModel.getCityById(city_id);
      const hospital = {
        id: insertId,
        longitude,
        latitude,
      };
      // 2. get all blood banks data (long, lat, id)
      const bloodBanks = await BloodBanksModel.getBloodBanksWithCity();
      bloodBanks.forEach(async (bank) => {
        const bloodBank = {
          id: bank.id,
          longitude: bank.longitude,
          latitude: bank.latitude,
        };
        await DistanceController.createDistance(hospital, bloodBank);
      });
      res.json({
        message: "The hospital is created successfully",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = HospitalsController;
