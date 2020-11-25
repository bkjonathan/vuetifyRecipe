<template>
  <UserDashboard>
    <v-row>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
      <RecipeCard/>
    </v-row>
    <v-fab-transition>
      <v-btn
              color="pink"
              dark
              fixed
              bottom
              right
              fab
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </UserDashboard>
</template>

<script>
    import UserDashboard from "../../components/Layout/UserDashboard";
    import RecipeCard from "../../components/User/RecipeCard";
    export default {
        name: "RecipeList",
        components: {RecipeCard, UserDashboard}
    }
</script>

<style scoped>

</style>
