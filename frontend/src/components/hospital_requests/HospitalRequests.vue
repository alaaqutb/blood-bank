<template>
  <div class="w-50 m-auto py-5">
    <h3 class="mb-3">Hospital Request</h3>
    <form>
      <div class="row d-flex">
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">Patient Status</label>
          <select
            class="form-select"
            :class="this.errors.patient_status"
            @blur="validatePatientStatus()"
            v-model="request.patient_status"
          >
            <option value="immediate">Immediate</option>
            <option value="urgent">Urgent</option>
            <option value="normal">Normal</option>
          </select>
          <div class="invalid-feedback">Invalid Patient Status</div>
        </div>
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">Quantity</label>
          <input
            type="text"
            class="form-control"
            :class="this.errors.quantity"
            @blur="validateQuantity()"
            v-model="request.quantity"
          />
          <div class="invalid-feedback">Invalid Quantity</div>
        </div>
      </div>

      <div class="row d-flex">
        <div class="mb-3 col-6">
          <label class="form-label my-form-label">Blood Type</label>
          <select
            class="form-select"
            @blur="validateBloodType()"
            :class="this.errors.blood_type"
            v-model="request.blood_type"
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
          <label class="form-label my-form-label">Hospital Name</label>
          <select
            class="form-select"
            @blur="validateHospitalName()"
            :class="this.errors.hospital_id"
            v-model="request.hospital_id"
          >
            <option
              :value="hospital.id"
              :key="hospital.id"
              v-for="hospital in hospitals"
            >
              {{ hospital.name }}
            </option>
          </select>
          <div class="invalid-feedback">Invalid Hospital Name</div>
        </div>
      </div>

      <button
        type="submit"
        class="btn mt-3 w-100 navBarColor text-light"
        @click.prevent="hospitalRequest()"
        :disabled="disableSubmit()"
      >
        Send Request
      </button>
    </form>
  </div>
</template>
<script>
import { instance } from "../../axios/axios";
export default {
  data() {
    return {
      hospitals: [],
      request: {
        blood_type: "",
        quantity: "",
        patient_status: "",
        hospital_id: "",
      },
      errors: {
        blood_type: "",
        quantity: "",
        patient_status: "",
        hospital_id: "",
      },
    };
  },
  methods: {
    async hospitalRequest() {
      const result = await instance.post("/hospital-requests", this.request);
    },
    validatePatientStatus() {},
    validateBloodType() {},
    validateHospitalName() {},
    validateQuantity() {},
    disableSubmit() {},
  },
  created: async function () {
    const result = await instance.get("/hospitals", {});
    this.hospitals = result.data.data;
  },
};
</script>
<style scoped></style>
