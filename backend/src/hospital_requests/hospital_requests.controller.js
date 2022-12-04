const BloodStocksModel = require("../blood_stocks/blood_stocks.model");
const HospitalRequestsModel = require("./hospital_requests.model");
const DistancesModel = require("./../distances/distances.model");

class HospitalRequestsController {
  static async createHospitalRequests(req, res, next) {
    try {
      const data = req.body;
      await HospitalRequestsModel.createHospitalRequests(data);
      // 1. get pending requests count
      const { requestsCount } =
        await HospitalRequestsModel.getPendingRequestCount();

      // if(requestsCount >= 10) {
      await HospitalRequestsController.manageHospitalRequests();
      // }
      res.json({
        message: "The hospital request is created successfully",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  }

  static async manageHospitalRequests() {
    // 2. get all pending requests // // grouped by blood type and ordered by patient status
    const requests = await HospitalRequestsModel.getPendingRequests();
    const separatedRequests = requests.reduce((acc, request) => {
      if (!Array.isArray(acc[request.blood_type])) acc[request.blood_type] = [];
      acc[request.blood_type].push(request);
      return acc;
    }, {});

    // 3. for each blood type get the available quantity from blood stocks
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
      if (separatedBloodStocks[bloodType] && separatedBloodStocks[bloodType].length > 0) {
        // complete the request process
        const bloodBanksIds = separatedBloodStocks[bloodType].reduce((acc, stock) => {
          if (!acc.includes(stock.blood_bank_id)) acc.push(stock.blood_bank_id);
          return acc;
        }, []);
        const hospitalsIds = separatedRequests[bloodType].reduce((acc, request) => {
          if (!acc.includes(request.hospital_id)) acc.push(request.hospital_id);
          return acc;
        }, []);

        const sortedRequests = await DistancesModel.getHospitalsBloodBanksDistance(hospitalsIds, bloodBanksIds);
      } else {
        // set request status = rejected
        await HospitalRequestsModel.rejectRequests(bloodType);
      }
    });
  }
}

module.exports = HospitalRequestsController;
