const mysql = require("mysql");
const dotenv = require("dotenv");
dotenv.config();

class DbProvider {
  constructor() {
    // set database configuration data
    this.host = process.env.DB_HOST;
    this.user = process.env.DB_USER;
    this.password = process.env.DB_PASS;
    this.database = process.env.DB_NAME;
  }

  execSQL(sql, params, callback) {
    const connection = mysql.createConnection({
      host: this.host,
      user: this.user,
      password: this.password,
      database: this.database,
    });

    // establish database connection
    connection.connect(function (err) {
      if (err) {
        console.error("error connecting: " + err.stack);
        return;
      }
      console.log("database connected as id " + connection.threadId);
    });

    // execute sql query
    connection.query(sql, params, function (error, rows, fields) {
      if (error) {
        console.log(error.stack);
        return callback(error, null);
      }
      callback(null, rows);
      connection.end();
      console.log("database disconnected");
      return;
    });
  }

  execute(sql, params) {
    return new Promise((resolve, reject) => {
      this.execSQL(sql, params, (err, rows) => {
        if (err) return reject(err);
        return resolve(rows);
      });
    });
  }
}

module.exports = DbProvider;
