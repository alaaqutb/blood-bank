const DistancesModel = require("./distances.model");
const { getDistance } = require("geolib");

class DistancesController {
  static async createDistance(hospital, bloodBank) {
    const distance = getDistance(hospital, bloodBank);
    const data = {
      distance,
      blood_bank_id: bloodBank.id,
      hospital_id: hospital.id,
    };
    await DistancesModel.createDistance(data);
  }
}

module.exports = DistancesController;
