const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class DistancesModel {
  static async createDistance(data) {
    const params = [data.distance, data.blood_bank_id, data.hospital_id];
    const sql = `INSERT INTO distances (distance, blood_bank_id, hospital_id) VALUES (?,?,?)`;
    await dbProvider.execute(sql, params);
  }

  static async getHospitalsBloodBanksDistance(hospitalsIds, bloodBanksIds) {
    const sql = `SELECT * FROM distances WHERE hospital_id IN (?) AND blood_bank_id IN (?) ORDER BY distance`;
    return await dbProvider.execute(sql, [hospitalsIds, bloodBanksIds]);
  }
}
module.exports = DistancesModel;
