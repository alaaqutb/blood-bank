import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import mitt from "mitt";
import "./assets/main.css";
import Notifications from "@kyvg/vue3-notification";

const emitter = mitt();
const app = createApp(App);
app.config.globalProperties.emitter = emitter;
app.use(router);
app.use(Notifications, { name: "alert" });

app.mount("#app");
