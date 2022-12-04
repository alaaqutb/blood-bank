const DonationsModel = require("./donations.model");
const BloodBanksModel = require("../blood_banks/blood_banks.model");
const BloodStocksModel = require("../blood_stocks/blood_stocks.model");
const dotenv = require("dotenv");

dotenv.config();
const { MAIL_USER, MAIL_PASS, MAIL_HOST } = process.env;
const UNIX_DAY = 24 * 60 * 60 * 1000;
class DonationsController {
  static async donate(req, res, next) {
    try {
      const data = req.body;
      const status = "pending";
      // 1. check if the user does not exist
      const result = await DonationsModel.getDonorByNationalId(
        data.national_id
      );
      if (!result) {
        // the donor does not exist
        // 2. validation
        await DonationsController.validateDonorData(data);

        // 3. create a new donor
        await DonationsModel.createDonor(data);
      } else {
        // the donor exists
        // 4. check the last donation date

        if (new Date(result.last_donation) + 90 * UNIX_DAY > new Date()) {
          status = "rejected";
          // send rejection email
          DonationsController.createEmail(
            "New Information about your donation!",
            `The your donation is ${status}`,
            data.email
          );
        }
      }
      const rows = await DonationsModel.getPendingDonationByNationalId(
        data.national_id
      );
      if (rows) {
        await DonationsModel.cancelDonation(data.national_id);
      }
      // 5. create the donation
      const donationData = {
        status,
        donor_national_id: data.national_id,
        blood_bank_id: data.blood_bank_id,
        blood_type: data.blood_type,
        // virus_test: null,
      };
      await DonationsModel.createDonation(donationData);
      res.json({
        message: "The donation is done successfully",
        data: null,
      });

      // to accept the donation, we need to check: last donation, virus test
    } catch (err) {
      next(err);
    }
  }

  static async getDonors(req, res, next) {
    try {
      const data = await DonationsModel.getDonors();
      res.json({
        message: "Donors are found successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getPendingDonations(req, res, next) {
    try {
      const data = await DonationsModel.getPendingDonations();
      res.json({
        message: "Pending Donations are found successfully",
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateDonations(req, res, next) {
    // 1. check the virus test, if it is positive then status will be equal rejected
    // if it negative then status will be equal accepted.
    // 2. any way accepted or rejected email will be send.
    // 3. donation will be update with the calculated status and virus test.
    try {
      const virus_test = req.body.virus_test;
      const donor_national_id = req.body.national_id;
      await DonationsController.validationDonation(
        virus_test,
        donor_national_id
      );
      const status = virus_test === "negative" ? "accepted" : "rejected";
      // if accepted, insert into blood stock
      // select * from donations where donor_national_id = ? and status = 'pending'
      // because each donor has ONLY ONE pending donation
      if (status === "accepted") {
        const donation =
          await DonationsController.getPendingDonationByNationalId(
            donor_national_id
          );
        const nationalId = donation.donor_national_id;
        const bloodType = donation.blood_type;
        const bloodBankId = donation.blood_bank_id;
        const donationDate = donation.donation_date;
        const expirationDate = donationDate + 35 * UNIX_DAY;

        await BloodStocksModel.createBloodStock(
          nationalId,
          bloodType,
          bloodBankId,
          expirationDate
        );
      }

      await DonationsModel.updateDonation(
        virus_test,
        donor_national_id,
        status
      );
      // send rejection email
      const donor = await DonationsController.getDonorByNationalId(
        donor_national_id
      );
      DonationsController.createEmail(
        "New Information about your donation!",
        `The your donation is ${status}`,
        donor.email
      );
      res.json({
        message: "The donation is updated successfully",
        data: null,
      });
    } catch (err) {
      next(err);
    }
  }

  static async validationDonation(virus_test, donor_national_id) {
    if (!virus_test || !donor_national_id) {
      throw new Error("Missing Data");
    }
    if (!virus_test === "positive" || !virus_test === "negative") {
      throw new Error("virus test must be include positive or negative");
    }
    const result = await DonationsModel.getPendingDonationByNationalId(
      donor_national_id
    );
    if (!result) {
      throw new Error("Invalid National ID");
    }
  }

  static async validateDonorData(data) {
    // national id: match regex, required
    // email: unique, valid email, required
    // name, city: required, length <= 50
    // blood_bank_id: required, exists
    // blood_type: required, valid
    // throw new Error("");
    const nationalIdRegex =
      /^(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!data.blood_bank_id) {
      throw new Error("Missing data");
    }
    const bloodBank = await BloodBanksModel.getBloodBankById(
      data.blood_bank_id
    );
    if (!bloodBank) {
      throw new Error("Blood Bank Id is required");
    }
    if (!data.blood_type) {
      throw new Error("Missing Data");
    }
    const arr = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
    if (!arr.includes(data.blood_type)) {
      throw new Error("Invalid Blood Type");
    }
    if (!data.email || !data.national_id || !data.name || !data.city_id) {
      throw new Error("Missing data");
    }
    if (!data.national_id.match(nationalIdRegex)) {
      throw new Error("Invalid National ID");
    }

    const donor = await DonationsModel.getDonorByEmail(data.email);
    if (donor) {
      throw new Error("Email must be unique");
    }
    if (!data.email.match(emailRegex)) {
      throw new Error("Invalid Email");
    }
    if (data.name.length > 50) {
      throw new Error("The name and the city must be less than 50 letters");
    }
  }

  static createEmail(subject, body, email) {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS,
      },
    });
    const options = {
      from: MAIL_USER,
      to: email,
      subject: subject,
      text: body,
    };

    transporter.sendMail(options, (err, info) => {
      if (err) {
        console.log(err);
      } else {
        console.log(info);
      }
    });
  }
}

module.exports = DonationsController;
