<template>
  <div class="container p-5 wrapper">
    <h3 class="mb-4 pb-2">My Hospital Requests</h3>
    <table class="table table-striped">
      <thead>
        <tr>
          <!-- <th scope="col">#</th> -->
          <th scope="col">Blood Type</th>
          <th scope="col">Status</th>
          <th scope="col">Quantity</th>
          <th scope="col">Patient Status</th>
          <!-- <th scope="col">Blood Bank</th> -->
          <th scope="col">Hospital Name</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="request in requests"
          :key="request.id"
          class="cursor-pointer"
        >
          <!-- <th scope="row">{{ index + 1 }}</th> -->
          <td>{{ request.blood_type }}</td>
          <td>{{ request.status }}</td>
          <td>{{ request.quantity }}</td>
          <td>{{ request.patient_status }}</td>
          <!-- <td>{{ request.blood_bank_id }}</td> -->
          <td>{{ request.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { instance } from "../../axios/axios";
export default {
  data() {
    return {
      requests: [],
      // {
      //   id: "",
      //   blood_type: "",
      //   status: "",
      //   quantity: "",
      //   patient_status: "",
      //   blood_bank_id: "",
      //   name: "",
      // },
    };
  },
  created: async function () {
    const token = this.getToken();
    const result = await instance.get("/hospital-requests", {
      headers: { authorization: token },
    });
    this.requests = result.data.data;
  },
  methods: {
    getToken() {
      return localStorage.getItem("token");
    },
  },
};
</script>
<style scoped></style>
