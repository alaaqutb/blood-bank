const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class HospitalsModel {
  static async getHospitals() {
    const sql = `SELECT * FROM hospitals`;
    const rows = await dbProvider.execute(sql, []);
    return rows;
  }

  static async getHospitalsWithCity() {
    const sql = `SELECT longitude, latitude, hospitals.id FROM hospitals INNER JOIN cities ON hospitals.city_id = cities.id`;
    const rows = await dbProvider.execute(sql, []);
    return rows;
  }

  static async createHospital(data) {
    const params = [data.name, data.city_id];
    const sql = `INSERT INTO hospitals (name, city_id) VALUES (?,?)`;
    const rows = await dbProvider.execute(sql, params);
    return rows;
  }

  static async getHospitalById(hospitalId) {
    const sql = `SELECT * FROM hospitals WHERE id = ?`;
    const rows = await dbProvider.execute(sql, [hospitalId]);
    return rows[0];
  }
}

module.exports = HospitalsModel;
