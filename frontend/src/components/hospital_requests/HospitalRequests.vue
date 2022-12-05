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
            type="number"
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
          <input class="form-control" v-model="hospitalName" disabled />
        </div>
      </div>

      <button
        type="submit"
        class="btn mt-3 w-100 text-light"
        style="background-color: #7b1fa2"
        @click.prevent="hospitalRequest()"
        :disabled="
          errors.blood_type || errors.quantity || errors.patient_status
        "
      >
        Send Request
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
      hospitalName: "",
      request: {
        blood_type: "",
        quantity: "",
        patient_status: "",
      },
      errors: {
        blood_type: "required",
        quantity: "required",
        patient_status: "required",
      },
    };
  },
  methods: {
    getToken() {
      return localStorage.getItem("token");
    },
    getHospitalId() {
      return localStorage.getItem("hospitalId");
    },
    async hospitalRequest() {
      if (
        !this.errors.blood_type &&
        !this.errors.quantity &&
        !this.errors.patient_status
      ) {
        try {
          const token = this.getToken();
          const hospitalId = this.getHospitalId();
          const result = await instance.post(
            "/hospital-requests",
            { ...this.request, hospital_id: hospitalId },
            {
              headers: { authorization: token },
            }
          );
          if (result) {
            notify({
              title: result.data.message,
            });
            this.request = {
              blood_type: "",
              quantity: "",
              patient_status: "",
            };
          }
        } catch (err) {
          notify({
            title: err.response.data.message,
          });
          // this.request = {
          //   blood_type: "",
          //   quantity: "",
          //   patient_status: "",
          // };
        }
      }
    },
    validatePatientStatus() {
      if (!this.request.patient_status) {
        this.errors.patient_status = "is-invalid";
      } else {
        this.errors.patient_status = null;
      }
    },
    validateBloodType() {
      if (!this.request.blood_type) {
        this.errors.blood_type = "is-invalid";
      } else {
        this.errors.blood_type = null;
      }
    },
    validateQuantity() {
      if (!this.request.quantity || this.request.quantity > 50) {
        this.errors.quantity = "is-invalid";
      } else {
        this.errors.quantity = null;
      }
    },
  },
  created: async function () {
    const token = this.getToken();
    const hospitalId = this.getHospitalId();
    const result = await instance.get(`/hospital/${hospitalId}`, {
      headers: { authorization: token },
    });
    this.hospitalName = result.data.data.hospitalName;
  },
};
</script>
<style scoped></style>
