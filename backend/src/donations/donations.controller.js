const DonationsModel = require("./donations.model");

class DonationsController {
  static async donate(req, res, next) {
    try {
      const data = req.body;
      const status = null;
      // 1. check if the user does not exist
      const result = await DonationsModel.getDonorByNationalId(
        data.national_id
      );
      if (!result) {
        // 2. validation
        await DonationsController.validateDonorData(data);

        // 3. create a new donor
        await DonationsModel.createDonor(data);
        // } else {
        //   // 4. check the last donation date
        //   const UNIX_DAY = 24 * 60 * 60;
        //   if (new Date(result.last_donation) + 35 * UNIX_DAY > new Date()) {
        //     status = 'rejected';
        //     // send rejection email
        //   }
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

  static async validateDonorData(data) {
    // national id: match regex, required
    // email: unique, valid email, required
    // name, city: required, length <= 50
    //! blood_bank_id: required, exists
    //! blood_type: required, valid
    //! ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
    // throw new Error("");

    const nationalIdRegex =
      /^(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (!data.email || !data.national_id || !data.name || !data.city) {
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
    if (data.name.length > 50 || data.city.length > 50) {
      throw new Error("The name and the city must be less than 50 letters");
    }
  }
}
module.exports = DonationsController;
