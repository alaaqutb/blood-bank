const BloodStocksModel = require("../blood_stocks/blood_stocks.model");
const HospitalRequestsModel = require("./hospital_requests.model");
const DistancesModel = require("./../distances/distances.model");
const HospitalsModel = require("../hospitals/hospitals.model");

class HospitalRequestsController {
  static async createHospitalRequests(req, res, next) {
    try {
      const data = req.body;
      await HospitalRequestsController.validateHospitalRequest(data);
      await HospitalRequestsModel.createHospitalRequests(data);
      // 1. get pending requests count
      const { requestsCount } =
        await HospitalRequestsModel.getPendingRequestCount();

      if (requestsCount >= 10) {
        await HospitalRequestsController.manageHospitalRequests();
      }
      res.json({
        message: "The hospital request is created successfully",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  }

  static async validateHospitalRequest(data) {
    const hospital = await HospitalsModel.getHospitalById(data.hospital_id);
    if (!hospital) {
      throw new Error("Hospital Id is required");
    }

    if (!["immediate", "urgent", "normal"].includes(data.patient_status)) {
      throw new Error("Invalid Patient Status");
    }

    if (!data.quantity || Number(data.quantity) > 50) {
      throw new Error("Invalid Blood Quantity");
    }

    const arr = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    if (!arr.includes(data.blood_type)) {
      throw new Error("Invalid Blood Type");
    }
  }

  static async getHospitalsRequests(req, res, next) {
    try {
      const data = await HospitalRequestsModel.getHospitalsRequests();
      res.json({
        message: "The hospital requests are found successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async manageHospitalRequests() {
    // 2. get all pending requests ordered by patient status
    const requests = await HospitalRequestsModel.getPendingRequests();
    const separatedRequests = requests.reduce((acc, request) => {
      if (!Array.isArray(acc[request.blood_type])) acc[request.blood_type] = [];
      acc[request.blood_type].push(request);
      return acc;
    }, {});

    // 3. for each blood type get the available quantity from blood stocks
    // get available and not expired blood stock
    const bloodStocks = await BloodStocksModel.getAvailableBloodStocks(
      Object.keys(separatedRequests)
    );
    const separatedBloodStocks = bloodStocks.reduce((acc, bloodStock) => {
      if (!Array.isArray(acc[bloodStock.blood_type]))
        acc[bloodStock.blood_type] = [];
      acc[bloodStock.blood_type].push(bloodStock);
      return acc;
    }, {});

    Object.keys(separatedRequests).forEach(async (bloodType) => {
      if (
        separatedBloodStocks[bloodType] &&
        separatedBloodStocks[bloodType].length > 0
      ) {
        const bloodQuantityPerBank = separatedBloodStocks[bloodType].reduce(
          (acc, stock) => {
            if (!acc[stock.blood_bank_id] && acc[stock.blood_bank_id] !== 0)
              acc[stock.blood_bank_id] = 0;
            acc[stock.blood_bank_id] += 1;
            return acc;
          },
          {}
        );

        const bloodQuantityPerHospital = separatedRequests[bloodType].reduce(
          (acc, request) => {
            if (!acc[request.hospital_id] && acc[request.hospital_id] !== 0)
              acc[request.hospital_id] = 0;
            acc[request.hospital_id] = Number(request.quantity);
            return acc;
          },
          {}
        );

        const bloodBanksIds = Object.keys(bloodQuantityPerBank);
        const hospitalsIds = Object.keys(bloodQuantityPerHospital);

        const sortedDistances =
          await DistancesModel.getHospitalsBloodBanksDistance(
            hospitalsIds,
            bloodBanksIds
          );

        sortedDistances.forEach(async (distance) => {
          const hospitalRequest = separatedRequests[bloodType].find(
            (request) =>
              String(request.hospital_id) === String(distance.hospital_id)
          );
          if (bloodQuantityPerBank[distance.blood_bank_id] > 0) {
            // accept the hospital request
            // set blood stocks as not available
            await HospitalRequestsModel.acceptRequest(
              distance.hospital_id,
              distance.blood_bank_id
            );
            const limit = hospitalRequest.quantity;
            await BloodStocksModel.updateBloodStock(
              distance.blood_bank_id,
              limit
            );
          }
        });
      } else {
        // set request status = rejected
        await HospitalRequestsModel.rejectRequests(bloodType);
      }
    });
  }
}

module.exports = HospitalRequestsController;
