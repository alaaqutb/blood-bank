const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class HospitalsModel {
  static async getHospitals() {
    const sql = `SELECT * FROM hospitals`;
    const rows = await dbProvider.execute(sql, []);
    return rows;
  }

  static async createHospital(data) {
    const params = [data.name, data.city_id];
    const sql = `INSERT INTO hospitals (name, city_id) VALUES (?,?)`;
    await dbProvider.execute(sql, params);
  }
}

module.exports = HospitalsModel;
