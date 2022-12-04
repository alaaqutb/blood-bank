<template>
  <div class="container p-5 wrapper">
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">National ID</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Blood Type</th>
          <th scope="col">Last Donation</th>
          <th scope="col">City</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(donor, index) in donors"
          :key="donor.national_id"
          class="cursor-pointer"
        >
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ donor.national_id }}</td>
          <td>{{ donor.name }}</td>
          <td>{{ donor.email }}</td>
          <td>{{ donor.blood_type }}</td>
          <td>{{ donor.last_donation }}</td>
          <td>{{ donor.city_id }}</td>
          <button
            type="button"
            class="btn btn-primary mx-3"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            @click.prevent="donorIndex = index"
          >
            Manage
          </button>
        </tr>
      </tbody>
    </table>

    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Result of virus test:
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <ul class="list-group m-3">
              <li class="list-group-item">
                Name: {{ donors[donorIndex] ? donors[donorIndex].name : "" }}
              </li>
              <select
                class="form-select form-select-sm mt-3"
                aria-label=".form-select-sm example"
                v-model="virusTest"
              >
                <option value="">Open this select menu</option>
                <option value="positive">Positive</option>
                <option value="negative">Negative</option>
              </select>
            </ul>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn navBarColor color-text"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn navBarColor color-text"
              data-bs-dismiss="modal"
              @click.prevent="updateDonation()"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { instance } from "../../axios/axios";
export default {
  data() {
    return {
      virusTest: "",
      donorIndex: null,
      donors: {
        national_id: "",
        name: "",
        email: "",
        blood_type: "",
        last_donation: "",
        city_id: "",
      },
    };
  },
  methods: {
    async updateDonation() {
      const national_id = this.donors[this.donorIndex].national_id;
      const result = await instance.put("/donate", {
        national_id,
        virus_test: this.virusTest,
      });
    },
  },
  created: async function () {
    const result = await instance.get("/donors", {});
    this.donors = result.data.data;
  },
};
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.color-text {
  color: white;
}
</style>
