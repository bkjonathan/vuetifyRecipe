<template>
  <v-toolbar
    color="primary"
    dark
    extended
    flat
    :src="require('@/assets/cooking.svg')"
  >
<!--    <v-app-bar-nav-icon></v-app-bar-nav-icon>-->
    <v-spacer/>
    <v-btn :to="{name:'login'}" v-if="!user">Login</v-btn>
    <template v-else>
      <v-btn :to="{name:'dashboard'}" class="mr-3" text>Dashboard</v-btn>
      <v-btn text @click="$emit('logout')">Logout</v-btn>
    </template>

  </v-toolbar>
</template>

<script>
export default {
  name: "Header",
    props:['user']
};
</script>

<style scoped></style>
