const BloodBanksModel = require("./blood_banks.model");

class BloodBanksController {
  static async getBloodBanks(req, res, next) {
    try {
      const data = await BloodBanksModel.getBloodBanks();
      res.json({
        message: "Blood banks are found successfully",
        data: data,
      });
    } catch(err) {
      next(err);
    }
  }

  static async createBloodBank(req, res, next) {
    try {
      const data = req.body;
      await BloodBanksModel.createBloodBank(data);

      res.json({
        message: "The blood bank is created successfully",
        data: null,
      });
    } catch(err) {
      next(err);
    }
  }
}

module.exports = BloodBanksController;
