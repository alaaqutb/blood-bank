<template>
  <nav class="navbar border-shadow navBarColor">
    <div class="container-fluid">
      <div class="d-flex align-items-baseline">
        <RouterLink to="/" class="navbar-brand text-light"
          >Blood Bank System</RouterLink
        >
        <RouterLink to="/hospital-requests" class="text-light nav-link active mx-3"
          >Hospital Request</RouterLink
        >
        <RouterLink to="/donors" class="text-light nav-link active mx-3"
          >Virus Test</RouterLink
        >
      </div>
    </div>
  </nav>
</template>
<script>
export default {};
</script>
<style>
.navBarColor {
  background-color: #7b1fa2;
}
</style>
