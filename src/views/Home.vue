<template>
  <v-card flat class="no-border">
    <Header :user="user" @logout="$emit('logout')" />

    <v-container fluid class="bg_admin" style="margin-bottom: 10rem">
      <v-row justify="center">
        <v-col cols="11">
          <v-card
            class="mx-auto"
            max-width="700"
            style="margin-top: -64px;"
            shaped
          >
            <v-toolbar flat>
              <template v-if="searchToggle">
                <v-text-field
                  label="Search Recipes"
                  class="mt-6"
                  dense
                  outlined
                  v-model="search"
                  style="width: 100%"
                />
              </template>
              <template v-else>
                Food Recipes App
              </template>

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
                <v-list>
                  <v-list-item-group>
                    <v-list-item tag="label">
                      <v-list-item-action>
                        <v-checkbox
                          color="primary"
                          v-model="reviewSort"
                        ></v-checkbox>
                      </v-list-item-action>

                      <v-list-item-content>
                        <v-list-item-title
                          >Sort by Most Reviews</v-list-item-title
                        >
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-card-text>
            </v-slide-x-transition>
          </v-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="6"
          md="6"
          lg="4"
          xl="3"
          v-for="(item, index) in filterItem"
          :key="index"
        >
          <HomeCard :item="item" />
        </v-col>
      </v-row>
    </v-container>
    <Footer/>
  </v-card>
</template>

<script>
// @ is an alias to /src

import Header from "../components/Layout/Header";
import { realTimeDb } from "../db";
import HomeCard from "../components/HomeCard";
import Footer from "../components/Layout/Footer";
export default {
  name: "Home",
  components: {Footer, HomeCard, Header },
  props: ["user"],
  data: () => ({
    search: "",
    showMore: false,
    reviewSort: false,
    searchToggle: false,
    items: []
  }),
  mounted() {
    this.getItems();
  },
  computed: {
    filterItem() {
      let data = JSON.parse(JSON.stringify(this.items));
      data = data.sort((a, b) => b.createdAt - a.createdAt);
      data = data.filter(v => v.status);

      if (this.reviewSort) {
        data = data
          .reduce((total, old) => {
            let totalStar = old.reviews
              .map(v => v.rating)
              .reduce((t, v) => (t += v), 0);
            total.push({
              ...old,
              totalStar,
              average: Number(totalStar / old.reviews.length).toFixed(1) * 1
            });

            return total;
          }, [])
          .sort((a, b) => b.average - a.average);
      }
      if (this.search !== "") {
        data = data.filter(
          v => v.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1
        );
      }
      return data;
    }
  },
  methods: {
    getItems() {
      let db = realTimeDb.ref("recipes");
      db.on("child_added", snapshot => {
        // let data = { ...{ id: snapshot.key }, ...snapshot.val() };
        let key = Object.keys(snapshot.val());
        // let data = [];
        key.forEach(v => {
          this.items.push({
            id: v,
            ...snapshot.val()[v],
            userId: snapshot.key
          });
        });
        // this.items.push(data);
      });

      // db.on("child_changed", snapshot => {
      //   let data = { ...{ id: snapshot.key }, ...snapshot.val() };
      //   let index = this.items.findIndex(v => v.id == snapshot.key);
      //   Object.assign(this.items[index], data);
      // });

      db.on("child_removed", snapshot => {
        let index = this.items.findIndex(v => v.id == snapshot.key);
        this.items.splice(index, 1);
      });
    }
  }
};
</script>
