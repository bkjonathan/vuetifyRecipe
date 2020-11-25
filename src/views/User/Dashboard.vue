<template>
  <UserDashboard>
    <v-row>
      <v-col cols="6" md="3" class="mt-3">
        <v-card class="dash_card" v-ripple>
          <div class="white--text text-center pt-3">Total Recipes</div>

          <v-card-text class="white--text text-center mt-n3">
            <h2>5</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3" class="mt-3">
        <v-card class="dash_card" v-ripple>
          <div class="white--text text-center pt-3">Total Likes</div>

          <v-card-text class="white--text text-center mt-n3">
            <h2>5</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <h4>Recent Recipes</h4>
      </v-col>
    </v-row>
  </UserDashboard>
</template>
<script>
import UserDashboard from "../../components/Layout/UserDashboard";
export default {
  name: "Dashboard",
  components: { UserDashboard }
};
</script>

<style scoped></style>
