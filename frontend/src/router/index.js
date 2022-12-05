import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../components/Home.vue";
import DonateComponent from "../components/donations/Donate.vue";
import HospitalRequestsComponent from "../components/hospital_requests/HospitalRequests.vue";
import DonorsComponent from "../components/donations/Donors.vue";
import LoginComponent from "../components/Login.vue";
import ListRequestsComponent from "../components/hospital_requests/ListRequests.vue";
import NotFoundComponent from "../components/NotFoundComponent.vue";

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
      component: HospitalRequestsComponent,
    },
    {
      path: "/donors",
      name: "donors",
      component: DonorsComponent,
    },
    {
      path: "/login",
      name: "login",
      component: LoginComponent,
    },
    {
      path: "/requests",
      name: "requests",
      component: ListRequestsComponent,
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: NotFoundComponent,
    },
  ],
});

router.beforeEach((to, from) => {
  if (
    !isAuthenticated() &&
    to.name !== "login" &&
    to.name !== "donate" &&
    to.name !== "home"
  ) {
    return { name: "login" };
  }
  if (isAuthenticated() && to.name === "login") {
    return { name: "notfound" };
  }
  if (isAuthenticated() && to.name === "home") {
    return { name: "notfound" };
  }
  if ((to.name === "requests" || to.name === "hospital requests") && !isHospitalUser()) {
    return { name: "notfound" };
  }
  if (to.name === "donors" && !isBloodBankUser()) {
    return { name: "notfound" };
  }
});

function isAuthenticated() {
  const token = localStorage.getItem("token");
  return !!token;
}

function isBloodBankUser() {
  return (
    !!localStorage.getItem("bloodBankId") &&
    localStorage.getItem("bloodBankId") !== "null"
  );
}

function isHospitalUser() {
  return (
    !!localStorage.getItem("hospitalId") &&
    localStorage.getItem("hospitalId") !== "null"
  );
}

export default router;
