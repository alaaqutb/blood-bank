<template>
  <div>
    <h3 class="w-75 m-auto pt-5 pb-3 px-5">Login</h3>
    <form class="w-75 m-auto px-5 pb-5">
      <div class="mb-3">
        <label class="form-label my-form-label">User Name</label>
        <input
          @blur="validateUserName()"
          type="text"
          class="form-control"
          :class="invalidUserName"
          aria-describedby="emailHelp"
          v-model="loginForm.username"
        />
        <div class="invalid-feedback">Invalid User Name</div>
      </div>
      <div class="mb-3">
        <label class="form-label my-form-label">Password</label>
        <input
          @blur="validatePassword()"
          type="password"
          class="form-control"
          :class="invalidPassword"
          v-model="loginForm.password"
        />
        <div class="invalid-feedback">Invalid Password</div>
      </div>
      <div class="mb-3 d-flex justify-content-center">
        <button
          type="submit"
          class="btn text-light w-25 m-2"
          style="background-color: #7b1fa2;"
          @click.prevent="login()"
          :disabled="(!loginForm.password || !loginForm.username)"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { instance } from "../axios/axios";
import { notify } from "@kyvg/vue3-notification";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      invalidUserName: "",
      invalidPassword: "",
    };
  },
  methods: {
    async login() {
      try {
        const result = await instance.post("/login", this.loginForm);
        const { token, hospitalId, bloodBankId } = result?.data;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("username", this.loginForm.username);
          localStorage.setItem("hospitalId", hospitalId);
          localStorage.setItem("bloodBankId", bloodBankId);
          notify({
            title: result.data.message,
          });
          this.emitter.emit("user-is-logged-in", {
            username: this.loginForm.username,
            hospitalId,
            bloodBankId,
          });
          this.$router.push("/");
        }
      } catch (err) {
        console.log(err.stack);
      }
    },
    validateUserName() {
      if (!this.loginForm.username) {
        this.invalidUserName = "is-invalid";
      } else {
        this.invalidUserName = "";
      }
    },
    validatePassword() {
      if (this.loginForm.password) {
        this.invalidPassword = "";
      } else {
        this.invalidPassword = "is-invalid";
      }
    },
  },
};
</script>
<style></style>
