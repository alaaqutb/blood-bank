const CitiesModel = require("./cities.model");

class CitiesController {
  static async getCities(req, res, next) {
    try {
      const data = await CitiesModel.getCities();
      res.json({
        message: "Cities are found successfully",
        data: data,
      });
    } catch(err) {
      next(err);
    }
  }

  static async createCity(req, res, next) {
    try {
      const data = req.body;
      await CitiesModel.createCity(data);

      res.json({
        message: "The city is created successfully",
        data: null,
      });
    } catch(err) {
      next(err);
    }
  }
}

module.exports = CitiesController;
