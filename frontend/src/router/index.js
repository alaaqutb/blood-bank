import { createRouter, createWebHistory } from "vue-router";
import HomeComponent from "../components/Home.vue";
import DonateComponent from "../components/donations/Donate.vue";

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
  ],
});

export default router;
