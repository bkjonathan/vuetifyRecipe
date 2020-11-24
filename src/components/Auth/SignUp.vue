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
        <v-form>
          <v-text-field
            label="Username"
            prepend-inner-icon="mdi-account"
            color="primary"
            filled
          />
          <v-text-field
            label="Email Address"
            prepend-inner-icon="mdi-email"
            color="primary"
            filled
          />
          <v-text-field
            label="Password"
            prepend-inner-icon="mdi-fingerprint"
            color="primary"
            filled
          />
          <div class="text-center mt-3">
            <v-btn rounded color="primary">Sign Up</v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "SignUp"
};
</script>

<style scoped></style>
