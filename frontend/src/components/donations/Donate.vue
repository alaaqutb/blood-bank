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
            @blur="validateNationalID()"
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
          />
          <div class="invalid-feedback">Invalid Email</div>
        </div>
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">City</label>

          <select
            class="form-select"
            :class="this.errors.city"
            @blur="validateCity()"
            v-model="donor.city"
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
          >
            <option value="">--</option>
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
        class="btn mt-3 w-100 navBarColor text-light"
        @click.prevent="donate()"
        :disabled="disableSubmit()"
      >
        Donate
      </button>
    </form>
  </div>
</template>
<script>
import { instance } from "../../axios/axios";
export default {
  data() {
    return {
      cities: [],
      blood_banks: [],
      donor: {
        name: "",
        email: "",
        blood_type: "",
        blood_bank_id: "",
        city: "",
        national_id: "",
      },
      errors: {
        name: "",
        email: "",
        blood_type: "",
        blood_bank_id: "",
        city: "",
        national_id: "",
      },
    };
  },
  methods: {
    async donate() {
      const result = await instance.post("/donate", this.donor);
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
      if (this.donor.city) {
        this.errors.city = null;
      } else {
        this.errors.city = "is-invalid";
      }
    },
    validateNationalID() {
      const regex =
        /^(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d$/;
      if (!this.donor.national_id.match(regex)) {
        this.errors.national_id = "is-invalid";
      } else {
        this.errors.national_id = null;
      }
    },
    disableSubmit() {},
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
