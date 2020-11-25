<template>
  <v-card class="overflow-hidden" flat style="border-radius: 0px;">
    <v-app-bar
      absolute
      color="primary"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title fixed-tabs>
          <v-tab :to="{ name: 'dashboard' }">Dashboard</v-tab>
          <v-tab :to="{ name: 'recipe' }">Recipes</v-tab>
          <v-tab :to="{ name: 'save_recipe' }">Saved Recipes</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="100vh"

    >
      <v-container>
        <div style="margin-top: 200px;"></div>
        <slot></slot>
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: "UserDashboard"
};
</script>

<style scoped></style>
