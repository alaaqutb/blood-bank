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
            <option value="">--</option>
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
            :class="this.errors.blood_bank"
            v-model="donor.blood_bank_id"
          >
            <option value="">--</option>
          </select>
          <div class="invalid-feedback">Invalid Blood Bank</div>
        </div>
      </div>

      <button
        type="submit"
        class="btn btn-primary mt-3 w-100"
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
      //   cities: [
      // it should come from the backend
      // { id: xxx, name: 'xxx' }
      //     { id: 1, name: "zagazig" },
      //   ],
      //   blood_banks: [{ id: 1, name: "Haya" }],
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
      console.log(result);
    },
    validateName() {},
    validateEmail() {},
    validateBloodType() {},
    validateBloodBank() {},
    validateCity() {},
    validateNationalID() {},
    disableSubmit() {},
  },
  created: async function () {},
};
</script>
<style scoped></style>
