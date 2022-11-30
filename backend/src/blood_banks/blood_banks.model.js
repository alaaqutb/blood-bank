const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class BloodBanksModel {
  static async getBloodBanks() {
    const sql = `SELECT * FROM blood_banks`;
    const rows = await dbProvider.execute(sql, []);
    return rows;
  }

  static async createBloodBank(data) {
    const params = [data.name, data.city_id];
    const sql = `INSERT INTO blood_banks (name, city_id) VALUES (?,?)`;
    await dbProvider.execute(sql, params);
  }
}

module.exports = BloodBanksModel;
