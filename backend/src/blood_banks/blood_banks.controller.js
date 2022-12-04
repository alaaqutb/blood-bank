const BloodBanksModel = require("./blood_banks.model");
const CitiesModel = require("../cities/cities.model");
const HospitalsModel = require("../hospitals/hospitals.model");
const DistanceController = require("../distances/distances.controller");

class BloodBanksController {
  static async getBloodBanks(req, res, next) {
    try {
      const data = await BloodBanksModel.getBloodBanks();
      res.json({
        message: "Blood banks are found successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async createBloodBank(req, res, next) {
    try {
      const { name, city_id } = req.body;
      const { insertId } = await BloodBanksModel.createBloodBank({
        name,
        city_id,
      });
      const { longitude, latitude } = await CitiesModel.getCityById(city_id);
      const bloodBank = {
        id: insertId,
        longitude,
        latitude,
      };
      const hospitals = await HospitalsModel.getHospitalsWithCity();
      hospitals.forEach(async (h) => {
        const hospital = {
          id: h.id,
          longitude: h.longitude,
          latitude: h.latitude,
        };
        await DistanceController.createDistance(hospital, bloodBank);
      });
      res.json({
        message: "The blood bank is created successfully",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = BloodBanksController;
