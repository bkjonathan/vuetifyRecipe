<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-card-text>
        <h1 class="text-center display-2 primary--text">
          Sign In
        </h1>
        <div class="text-center mt-4">
          <v-btn class="mx-2" fab color="black" outlined>
            <v-icon color="primary">mdi-google</v-icon>
          </v-btn>
        </div>
        <h4 class="text-center mt-4">
          Ensure your email for registration
        </h4>
        <v-divider class="my-4" />
        <v-form v-model="valid" @submit.prevent="login" ref="loginForm">
          <v-text-field
            label="Email Address"
            prepend-inner-icon="mdi-mail"
            color="primary"
            filled
            v-model="email"
            :rules="[() => !!email || 'Email field is required']"
          />
          <v-text-field
            label="Password"
            prepend-inner-icon="mdi-fingerprint"
            color="primary"
            type="password"
            filled
            v-model="password"
            :rules="[() => !!password || 'Password field is required']"
          />
          <!--          <h3 class="text-center mt-3">Forget your Password ?</h3>-->
          <div class="text-center mt-3">
            <v-btn type="submit" rounded color="primary">Sign In</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-col>
    <v-col cols="12" md="4" class="primary">
      <v-card-text class="white--text mt-12">
        <h1 class="text-center display-1">Hello, Friends !</h1>
        <h5 class="text-center">
          Enter your personal Details and start Journay with us
        </h5>
      </v-card-text>
      <div class="text-center">
        <v-btn rounded outlined dark @click="$emit('step')">Sign Up</v-btn>
      </div>
    </v-col>
    <v-snackbar
      v-model="snackbar"
      :timeout="2000"
      top
      right
      :color="snackbarColor"
    >
      {{ errorMsg }}
    </v-snackbar>
  </v-row>
</template>

<script>
/* eslint-disable no-unused-vars */

import { firebaseAuth } from "../../db";

export default {
  name: "SignIn",
  data: () => ({
    email: "",
    password: "",
    errorMsg: "",
    snackbarColor: "error",
    snackbar: false,
    valid: false
  }),
  methods: {
    login: function() {
      this.$refs.loginForm.validate();
      if (this.valid) {
        firebaseAuth.signInWithEmailAndPassword(this.email, this.password).then(
          () => {
            this.$router.push("/");
          },
          error => {
            this.errorMsg = error.message;
            this.snackbar = true;
          }
        );
      }
    }
  }
};
</script>

<style scoped></style>
