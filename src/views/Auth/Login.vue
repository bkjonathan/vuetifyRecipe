<template>
  <v-container class="fill-height login_img" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" md="8">
        <v-card class="elevation-12">
          <v-window v-model="step">
            <v-window-item :value="1">
              <SignIn @step="step++"/>
            </v-window-item>
            <v-window-item :value="2">
              <SignUp  @step="step--"/>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SignIn from "../../components/Auth/SignIn";
import SignUp from "../../components/Auth/SignUp";
export default {
  name: "Login",
    components: {SignUp, SignIn},
    data: () => ({
    step: 1
  })
};
</script>

<style scoped></style>
