<template>
  <div class="d-flex justify-content-center flex-column">
    <button
      type="button"
      class="btn btn-secondary w-25 my-5 mx-auto"
      @click.prevent="donate()"
    >
      Donate Now
    </button>
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
    async donate() {
      this.$router.push("/donate");
    },
  },
};
</script>
<style></style>
