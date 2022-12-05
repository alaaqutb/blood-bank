const LoginModel = require("./login.model");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const { EXPIRES_IN, ISSUER, SUBJECT, ALGORITHM, PRIVATE_KEY } = process.env;
class LoginController {
  static async authenticateHospitalUser(req, res, next) {
    try {
      const token = req.headers.authorization;
      const options = {
        expiresIn: parseInt(EXPIRES_IN, 10),
        issuer: ISSUER,
        subject: SUBJECT,
        algorithm: ALGORITHM,
      };
      const decoded = jwt.verify(token, process.env.PUBLIC_KEY, options);
      if (decoded) {
        const user = await LoginModel.getUserByUserNameForLogin(
          decoded.username
        );
        if (!user || decoded.hospital_id === null) {
          res.json({ message: "Unauthenticated" });
        }
      } else {
        res.json({ message: "Unauthenticated" });
      }
      res.locals.auth = decoded;
      next();
    } catch (err) {
      console.log(err.stack);
      next(err);
    }
  }

  static async authenticateBloodBankUser(req, res, next) {
    try {
      const token = req.headers.authorization;
      const options = {
        expiresIn: parseInt(EXPIRES_IN, 10),
        issuer: ISSUER,
        subject: SUBJECT,
        algorithm: ALGORITHM,
      };
      const decoded = jwt.verify(token, process.env.PUBLIC_KEY, options);
      if (decoded) {
        const user = await LoginModel.getUserByUserNameForLogin(
          decoded.username
        );
        if (!user || decoded.blood_bank_id === null) {
          res.json({ message: "Unauthenticated" });
        }
      } else {
        res.json({ message: "Unauthenticated" });
      }
      res.locals.auth = decoded;
      next();
    } catch (err) {
      console.log(err.stack);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const username = req.body.username;
      const password = req.body.password;
      if (username && password) {
        const user = await LoginModel.getUserByUserNameForLogin(username);
        if (user) {
          const payload = {
            national_id: user.national_id,
            username: user.username,
            hospital_id: user.hospital_id,
            blood_bank_id: user.blood_bank_id,
          };
          const options = {
            expiresIn: parseInt(EXPIRES_IN, 10),
            issuer: ISSUER,
            subject: SUBJECT,
            algorithm: ALGORITHM,
          };
          const token = jwt.sign(payload, PRIVATE_KEY, options);
          res.json({
            message: "Signed In Successfully",
            token,
            bloodBankId: user.blood_bank_id,
            hospitalId: user.hospital_id,
          });
        } else {
          res.json({ message: "invalid username or password" });
        }
      } else {
        res.json({ message: "username and password are required" });
      }
    } catch (err) {
      console.log(err.stack);
      next(err);
    }
  }
}

module.exports = LoginController;
