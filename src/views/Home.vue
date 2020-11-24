<template>
  <v-card flat class="no-border">
    <Header :user="user"  @logout="$emit('logout')"/>

    <v-container fluid>
      <v-row justify="center">
        <v-col cols="11">
          <v-card
            class="mx-auto"
            max-width="700"
            style="margin-top: -64px;"
            shaped
          >
            <v-toolbar flat>
              <v-toolbar-title class="grey--text">
                <template v-if="searchToggle">
                  <v-text-field
                    label="Search Recipes"
                    class="mt-6"
                    dense
                    outlined
                    shaped
                  />
                </template>
                <template v-else>
                  Food Recipes App
                </template>
              </v-toolbar-title>

              <v-spacer></v-spacer>

              <v-btn icon @click="searchToggle = !searchToggle">
                <v-icon>mdi-magnify</v-icon>
              </v-btn>

              <!--              <v-btn icon>-->
              <!--                <v-icon>mdi-apps</v-icon>-->
              <!--              </v-btn>-->

              <v-btn icon @click="showMore = !showMore">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>

            <v-divider></v-divider>

            <v-slide-x-transition>
              <v-card-text v-if="showMore" style="height: 200px;">
                gddd
              </v-card-text>
            </v-slide-x-transition>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" md="6" lg="4" xl="3">
          <v-card class="mx-auto">
            <v-img
              height="250"
              src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              :aspect-ratio="1"
            ></v-img>

            <v-card-title>Cafe Badilico</v-card-title>

            <v-card-text class="mt-n5">
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>

                <div class="grey--text ml-4">
                  4.5 (413)
                </div>
              </v-row>

              <div class="my-2 subtitle-1">
                $ • Italian, Cafe
              </div>

              <div>
                Small plates, salads & sandwiches - an intimate setting with 12
                indoor seats plus patio seating.
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
// @ is an alias to /src

import Header from "../components/Layout/Header";
export default {
  name: "Home",
  components: { Header },
  props: ["user"],
  data: () => ({
    showMore: false,
    searchToggle: false
  })
};
</script>
