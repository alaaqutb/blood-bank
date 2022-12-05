const DbProvider = require("../db/db");
const dbProvider = new DbProvider();

class HospitalRequestsModel {
  static async createHospitalRequests(data) {
    const params = [
      data.blood_type,
      data.quantity,
      data.patient_status,
      data.hospital_id,
    ];
    const sql = `INSERT INTO hospital_requests (blood_type, quantity, patient_status, hospital_id) VALUES (?,?,?,?)`;
    await dbProvider.execute(sql, params);
  }

  static async getPendingRequestCount() {
    const sql = `SELECT COUNT(*) AS requestsCount FROM hospital_requests WHERE status = 'pending'`;
    const rows = await dbProvider.execute(sql, []);
    return rows[0];
  }

  static async getPendingRequests() {
    const sql = `SELECT * FROM hospital_requests WHERE status = 'pending' ORDER BY patient_status`;
    const rows = await dbProvider.execute(sql, []);
    return rows;
  }

  static async rejectRequests(bloodType) {
    const sql = `UPDATE hospital_requests SET status = 'rejected' WHERE status = 'pending' AND blood_type = ?`;
    await dbProvider.execute(sql, [bloodType]);
  }

  static async acceptRequest(hospitalId, bloodBankId) {
    const sql = `UPDATE hospital_requests SET status = 'accepted', blood_bank_id = ? WHERE status = 'pending' AND hospital_id = ?`;
    await dbProvider.execute(sql, [bloodBankId, hospitalId]);
  }

  static async getHospitalsRequests() {
    const sql = `SELECT * FROM hospital_requests INNER JOIN hospitals ON hospital_requests.hospital_id = hospitals.id`;
    const rows = await dbProvider.execute(sql, []);
    return rows;
  }
}
module.exports = HospitalRequestsModel;
