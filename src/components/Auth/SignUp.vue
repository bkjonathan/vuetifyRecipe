<template>
  <v-row class="fill-height">
    <v-col cols="12" md="4" class="primary">
      <v-card-text class="white--text mt-12">
        <h1 class="text-center display-1">Welcome Back !</h1>
        <h5 class="text-center">
          To Keep Connected with us please login with personal details
        </h5>
      </v-card-text>
      <div class="text-center">
        <v-btn rounded outlined dark @click="$emit('step')">Sign In</v-btn>
      </div>
    </v-col>
    <v-col cols="12" md="8">
      <v-card-text class="mt-12">
        <h1 class="text-center display-2 primary--text">Create Account</h1>
        <div class="text-center mt-3">
          <v-btn class="mx-2" fab color="primary" outlined>
            <v-icon>mdi-google</v-icon>
          </v-btn>
        </div>
        <h4 class="text-center mt-3">
          Ensure your email for Registration
        </h4>
        <v-divider class="my-4" />
        <v-form v-model="valid" @submit.prevent="register" ref="registerForm">
          <v-text-field
            label="Username"
            prepend-inner-icon="mdi-account"
            color="primary"
            filled
            v-model="username"
            :rules="[() => !!username || 'Username field is required']"
          />
          <v-text-field
            label="Email Address"
            prepend-inner-icon="mdi-email"
            color="primary"
            filled
            type="email"
            v-model="email"
            :rules="[() => !!email || 'Email field is required']"
          />
          <v-text-field
            label="Password"
            prepend-inner-icon="mdi-fingerprint"
            color="primary"
            filled
            type="password"
            v-model="password"
            :rules="[() => !!password || 'Password field is required']"
          />
          <v-text-field
            label="Confirm Password"
            prepend-inner-icon="mdi-fingerprint"
            color="primary"
            filled
            type="password"
            v-model="con_password"
            :rules="[
              () => !!con_password || 'Confirm Password field is required',
              () => con_password === password || 'Password does not match'
            ]"
          />
          <div class="text-center mt-3">
            <v-btn type="submit" rounded color="primary">Sign Up</v-btn>
          </div>
        </v-form>
      </v-card-text>
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
import { firebaseAuth } from "../../db";

export default {
  name: "SignUp",
  data: () => ({
    email: "",
    password: "",
    con_password: "",
    username: "",
    errorMsg: "",
    snackbarColor: "error",
    snackbar: false,
    valid: false
  }),
  methods: {
    register: function() {
      this.$refs.registerForm.validate();
      if (this.valid) {
        firebaseAuth
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(
            userCred => {
              return userCred.user
                .updateProfile({
                  displayName: this.username
                })
                .then(() => {
                  this.$router.push("/");
                });
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
