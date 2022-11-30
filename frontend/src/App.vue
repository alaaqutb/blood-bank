<template>
  <div class="components-wrapper">
    <RouterView />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import HomeComponent from "./components/Home.vue";
import DonateComponent from "./components/donations/Donate.vue";

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
</style>
