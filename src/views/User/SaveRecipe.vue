<template>
  <UserDashboard>
    <v-row>
      <RecipeCard/>
    </v-row>
  </UserDashboard>
</template>

<script>
    import UserDashboard from "../../components/Layout/UserDashboard";
    import RecipeCard from "../../components/User/RecipeCard";
    export default {
        name: "SaveRecipe",
        components: {RecipeCard, UserDashboard}
    }
</script>

<style scoped>

</style>
