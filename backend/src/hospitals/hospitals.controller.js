const HospitalsModel = require("./hospitals.model");

class HospitalsController {
  static async getHospitals(req, res, next) {
    try {
      const data = await HospitalsModel.getHospitals();
      res.json({
        message: "Hospitals are found successfully",
        data: data,
      });
    } catch(err) {
      next(err);
    }
  }

  static async createHospital(req, res, next) {
    try {
      const data = req.body;
      await HospitalsModel.createHospital(data);

      res.json({
        message: "The hospital is created successfully",
        data: null,
      });
    } catch(err) {
      next(err);
    }
  }
}

module.exports = HospitalsController;
