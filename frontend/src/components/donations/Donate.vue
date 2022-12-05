<template>
  <div class="w-50 m-auto py-5">
    <h3 class="mb-3">Donate</h3>
    <form>
      <div class="row d-flex">
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">National ID</label>
          <input
            type="number"
            class="form-control"
            :class="this.errors.national_id"
            @blur="getDonor()"
            v-model="donor.national_id"
          />
          <div class="invalid-feedback">Invalid National ID</div>
        </div>
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">Name</label>
          <input
            type="text"
            class="form-control"
            :class="this.errors.name"
            @blur="validateName()"
            v-model="donor.name"
            :disabled="disableFields"
          />
          <div class="invalid-feedback">Invalid Name</div>
        </div>
      </div>

      <div class="row d-flex">
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">Email Address</label>
          <input
            type="email"
            class="form-control"
            :class="this.errors.email"
            @blur="validateEmail()"
            aria-describedby="emailHelp"
            v-model="donor.email"
            :disabled="disableFields"
          />
          <div class="invalid-feedback">Invalid Email</div>
        </div>
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">City</label>

          <select
            class="form-select"
            :class="this.errors.city"
            @blur="validateCity()"
            v-model="donor.city_id"
            :disabled="disableFields"
          >
            <option :value="city.id" :key="city.id" v-for="city in cities">
              {{ city.name }}
            </option>
          </select>
          <div class="invalid-feedback">Invalid City</div>
        </div>
      </div>

      <div class="row d-flex">
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">Blood Type</label>
          <select
            class="form-select"
            @blur="validateBloodType()"
            :class="this.errors.blood_type"
            v-model="donor.blood_type"
            :disabled="disableFields"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <div class="invalid-feedback">Invalid Blood Type</div>
        </div>
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">Blood Bank</label>
          <select
            class="form-select"
            @blur="validateBloodBank()"
            :class="this.errors.blood_bank_id"
            v-model="donor.blood_bank_id"
          >
            <option
              :value="blood_bank.id"
              :key="blood_bank.id"
              v-for="blood_bank in blood_banks"
            >
              {{ blood_bank.name }}
            </option>
          </select>
          <div class="invalid-feedback">Invalid Blood Bank</div>
        </div>
      </div>

      <button
        type="submit"
        class="btn mt-3 w-100 text-light"
        style="background-color: #7b1fa2"
        @click.prevent="donate()"
        :disabled="
          errors.name ||
          errors.email ||
          errors.blood_type ||
          errors.blood_bank_id ||
          errors.city ||
          errors.national_id
        "
      >
        Donate
      </button>
    </form>
  </div>
</template>
<script>
import { instance } from "../../axios/axios";
import { notify } from "@kyvg/vue3-notification";
export default {
  data() {
    return {
      nationalId: "",
      disableFields: false,
      cities: [],
      blood_banks: [],
      donor: {
        name: "",
        email: "",
        blood_type: "",
        blood_bank_id: "",
        city_id: "",
        national_id: "",
      },
      errors: {
        name: "required",
        email: "required",
        blood_type: "required",
        blood_bank_id: "required",
        city: "required",
        national_id: "required",
      },
    };
  },
  methods: {
    async donate() {
      try {
        const result = await instance.post("/donate", this.donor);
        if (result) {
          notify({
            title: result.data.message,
          });
        }
        this.donor = {
          name: "",
          email: "",
          blood_type: "",
          blood_bank_id: "",
          city_id: "",
          national_id: "",
        };
      } catch (err) {
        notify({
          title: err.response.data.message,
        });
        // this.donor = {
        //   name: "",
        //   email: "",
        //   blood_type: "",
        //   blood_bank_id: "",
        //   city_id: "",
        //   national_id: "",
        // };
      }
    },
    validateName() {
      if (this.donor.name.length > 50 || this.donor.name.length < 3) {
        this.errors.name = "is-invalid";
      } else {
        this.errors.name = null;
      }
    },
    validateEmail() {
      const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      if (!this.donor.email.match(regex)) {
        this.errors.email = "is-invalid";
      } else {
        this.errors.email = null;
      }
    },
    validateBloodType() {
      if (this.donor.blood_type) {
        this.errors.blood_type = null;
      } else {
        this.errors.blood_type = "is-invalid";
      }
    },
    validateBloodBank() {
      if (this.donor.blood_bank_id) {
        this.errors.blood_bank_id = null;
      } else {
        this.errors.blood_bank_id = "is-invalid";
      }
    },
    validateCity() {
      if (this.donor.city_id) {
        this.errors.city = null;
      } else {
        this.errors.city = "is-invalid";
      }
    },
    validateNationalID() {
      const regex =
        /^(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d$/;
      if (
        !this.donor.national_id ||
        !String(this.donor.national_id).match(regex)
      ) {
        this.errors.national_id = "is-invalid";
      } else {
        this.errors.national_id = null;
      }
    },
    async getDonor() {
      this.validateNationalID();
      if (!this.errors.national_id) {
        const user = await instance.get(`/donor/${this.donor.national_id}`, {});
        if (user && user.data && user.data.data) {
          this.donor.name = user.data.data.name;
          this.donor.email = user.data.data.email;
          this.donor.blood_type = user.data.data.blood_type;
          this.donor.city_id = user.data.data.city_id;
          this.disableFields = true;
          this.nationalId = user.data.data.national_id;

          this.errors.name = null;
          this.errors.email = null;
          this.errors.blood_type = null;
          // this.errors.blood_bank_id = null;
          this.errors.city = null;
          this.errors.national_id = null;
        } else {
          this.disableFields = false;
        }
      } else {
        this.disableFields = false;
      }
    },
  },
  created: async function () {
    const result = await instance.get("/blood-banks", {});
    this.blood_banks = result.data.data;

    const values = await instance.get("/cities", {});
    this.cities = values.data.data;
  },
};
</script>
<style scoped></style>
