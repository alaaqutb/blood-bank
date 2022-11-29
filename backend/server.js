const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
const HOST = process.env.HOST;
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello World" });
});
// Not found
app.use((request, response) => {
  response.status(404).json({ message: "Not Found!" });
});
// Error
app.use((request, response, next, error) => {
  const status = error.status || 500;
  response.status(status).json({ message: error + "" });
});
app.listen(PORT, HOST, () => {
  console.log(`starting server on ${HOST}:${PORT}`);
});
