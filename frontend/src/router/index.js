import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../components/Home.vue";
import DonateComponent from "../components/donations/Donate.vue";
import HospitalRequestsComponent from "../components/hospital_requests/HospitalRequests.vue";
import DonorsComponent from "../components/donations/Donors.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeComponent,
    },
    {
      path: "/donate",
      name: "donate",
      component: DonateComponent,
    },
    {
      path: "/hospital-requests",
      name: "hospital requests",
      component: HospitalRequestsComponent
    },
    {
      path: "/donors",
      name: "donors",
      component: DonorsComponent
      
    }
     
  ],
});

export default router;
