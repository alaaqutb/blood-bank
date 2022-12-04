const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const DonationsRouter = require("./src/donations/donations.routes");
const BloodBanksRouter = require("./src/blood_banks/blood_banks.routes");
const CitiesRouter = require("./src/cities/cities.routes");
const HospitalsRouter = require("./src/hospitals/hospitals.routes");
const HospitalRequestsRouter = require("./src/hospital_requests/hospital_requests.routes");
const bodyParser = require("body-parser");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(DonationsRouter);
app.use(BloodBanksRouter);
app.use(CitiesRouter);
app.use(HospitalsRouter);
app.use(HospitalRequestsRouter);
// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hello World" });
// });
// Not found
app.use((request, response) => {
  response.status(404).json({ message: "Not Found!" });
});
// Error
app.use((err, req, res, next) => {
  console.log(err.stack);
  const status = err.status || 500;
  res.status(status).json({ message: err + "" });
});
app.listen(PORT, HOST, () => {
  console.log(`starting server on ${HOST}:${PORT}`);
});
