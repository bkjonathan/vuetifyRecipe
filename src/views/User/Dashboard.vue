<template>
  <UserDashboard @logout="$emit('logout')" >
    <v-row>
      <v-col cols="6" md="3" class="mt-3">
        <v-card class="dash_card" v-ripple>
          <div class="white--text text-center pt-3">Total Recipes</div>

          <v-card-text class="white--text text-center mt-n3">
            <h2>{{ items.length }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3" class="mt-3">
        <v-card class="dash_card" v-ripple>
          <div class="white--text text-center pt-3">Total Reviews</div>

          <v-card-text class="white--text text-center mt-n3">
            <h2>{{ totalReviews }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="3" class="mt-3">
        <v-card class="dash_card" v-ripple>
          <div class="white--text text-center pt-3">Total Star</div>

          <v-card-text class="white--text text-center mt-n3">
            <h2>{{ totalStars }}</h2>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="items">
      <v-col cols="12">
        <h4>Recent Recipes</h4>
      </v-col>
      <RecipeCard
        v-for="(item, index) in recentItem"
        :key="index"
        :item="item"
        :detail="false"
      />

      <v-col cols="12">
        <h4>Most Reviews Recipes</h4>
      </v-col>
      <RecipeCard
              v-for="(item, index) in mostReviews"
              :key="'most-'+index"
              :item="item"
              :detail="false"
      />
    </v-row>
  </UserDashboard>
</template>
<script>
/* eslint-disable vue/no-unused-components */

import UserDashboard from "../../components/Layout/UserDashboard";
import RecipeCard from "../../components/User/RecipeCard";
import { realTimeDb } from "../../db";
export default {
  name: "Dashboard",
  props: ["user"],
  components: { RecipeCard, UserDashboard },
  data: () => ({
    items: []
  }),
  computed: {
    recentItem() {
      let data = JSON.parse(JSON.stringify(this.items));
      data = data.sort((a, b) => b.createdAt - a.createdAt);
      data = data.slice(0, 10);
      return data;
    },
    mostReviews() {
      let data = JSON.parse(JSON.stringify(this.items));
      data = data
        .reduce((total, old) => {
          if (old.reviews){
            let totalStar = old.reviews
                    .map(v => v.rating)
                    .reduce((t, v) => (t += v), 0);

            total.push({
              ...old,
              totalStar,
              average: Number(totalStar / old.reviews.length).toFixed(1) * 1
            });
          }


          return total;
        }, [])
        .sort((a, b) => b.average - a.average);
      return data;
    },
    totalReviews() {
      return this.items
        .map(v => (v.reviews?v.reviews.length:0))
        .reduce((total, old) => (total += old), 0);
    },
    totalStars() {
      return this.items
        .map(v =>
          v.reviews?v.reviews.map(r => r.rating).reduce((tt, cc) => (tt += cc), 0):0
        )
        .reduce((total, o) => (total += o), 0);
    }
  },
  mounted() {
    if (this.user) {
      this.getItems(this.user.uid);
    }else{
      this.$router.push({name:'login'})
    }
  },
  methods: {
    getItems(id) {
      let db = realTimeDb.ref("recipes/" + id);
      db.on("child_added", snapshot => {
        let data = { ...{ id: snapshot.key }, ...snapshot.val() };
        this.items.push(data);
      });

      db.on("child_changed", snapshot => {
        let data = { ...{ id: snapshot.key }, ...snapshot.val() };
        let index = this.items.findIndex(v => v.id == snapshot.key);
        Object.assign(this.items[index], data);
      });

      db.on("child_removed", snapshot => {
        let index = this.items.findIndex(v => v.id == snapshot.key);
        this.items.splice(index, 1);
      });
    }
  },
  watch: {
    user(val) {
      if (val) {
        // console.log(val);
        this.getItems(val.uid);
      }
    }
  }
};
</script>

<style scoped></style>
