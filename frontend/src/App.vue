<template>
  <div>
    <notifications position="bottom right" classes="my-notification"/>
    <HeaderComponent />
    <div class="components-wrapper">
      <RouterView />
    </div>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import HomeComponent from "./components/Home.vue";
import DonateComponent from "./components/donations/Donate.vue";
import HospitalRequestsComponent from "./components/hospital_requests/HospitalRequests.vue";
import HeaderComponent from "./components/Header.vue";
import DonorsComponent from "./components/donations/Donors.vue";
import LoginComponent from "./components/Login.vue";
import ListRequestsComponent from "./components/hospital_requests/ListRequests.vue";
import NotFoundComponentVue from "./components/NotFoundComponent.vue";

export default {
  data() {
    return {
      //
    };
  },
  methods: {
    //
  },
  components: {
    HomeComponent,
    DonateComponent,
    HospitalRequestsComponent,
    HeaderComponent,
    DonorsComponent,
    LoginComponent,
    ListRequestsComponent,
    NotFoundComponentVue,
  },
};
</script>

<style>
body {
  background-color: lightgray;
}
.components-wrapper {
  background-color: white;
  margin: 13px auto;
  border-radius: 3px;
  box-shadow: 1px 1px 10px;
  width: 85%;
}

.my-notification{
  background-color: #7b1fa2;
  color: white;
}
</style>
