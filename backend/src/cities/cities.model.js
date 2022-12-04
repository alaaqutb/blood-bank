const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class CitiesModel {
  static async getCities() {
    const sql = `SELECT * FROM cities`;
    const rows = await dbProvider.execute(sql, []);
    return rows;
  }

  static async createCity(data) {
    const params = [data.name, data.latitude, data.longitude];
    const sql = `INSERT INTO cities (name, latitude, longitude) VALUES (?,?,?)`;
    await dbProvider.execute(sql, params);
  }

  static async getCityById(city_id) {
    const sql = `SELECT * FROM cities WHERE id = ?`;
    const rows = await dbProvider.execute(sql, [city_id]);
    return rows[0];
  }
}

module.exports = CitiesModel;
