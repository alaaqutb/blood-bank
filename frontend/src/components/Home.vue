<template>
  <div>
    <div class="text-center m-5 p-5"><h1>Welcome to Blood Bank System</h1></div>
    <div class="d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-secondary w-25 my-5 mx-2"
        @click.prevent="donate()"
      >
        Donate Now
      </button>
      <button
        type="button"
        class="btn btn-secondary w-25 my-5 mx-2"
        @click.prevent="login()"
      >
        Login
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //
    };
  },
  methods: {
    donate() {
      this.$router.push("/donate");
    },
    login() {
      this.$router.push("/login");
    },
  },
};
</script>
<style></style>
