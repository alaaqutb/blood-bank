const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class LoginModel {
  static async getUserByUserNameForLogin(username) {
    const sql = `SELECT * FROM users WHERE username = ?`;
    const rows = await dbProvider.execute(sql, [username]);
    return rows[0];
  }
}

module.exports = LoginModel;
