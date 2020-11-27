<template>
  <v-card class="no-border bg_admin" flat v-if="user">
    <v-overlay :value="overlay" color="white" opacity="1">
      <div class="black--text">Thomas Recipe App Loading...</div>
      <div class="text-center mt-5">
        <v-progress-circular
                indeterminate
                size="64"
                color="black"

        ></v-progress-circular>
      </div>
    </v-overlay>
    <v-img height="200px" :src="item.photo">
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-btn color="white" :to="{ name: 'home' }" exact fab small>
          <v-icon>mdi-keyboard-backspace</v-icon>
        </v-btn>

        <v-spacer></v-spacer>
        <v-btn
          fab
          small
          color="white"
          @click="saveBookMark()"
          v-if="checkBookMark"
        >
          <v-icon>mdi-bookmark</v-icon>
        </v-btn>
      </v-app-bar>

      <v-card-title class="white--text">
        <v-avatar size="56">
          <img alt="user" :src="item.photo" />
        </v-avatar>
        <div>
          <p class="ml-3 primary pa-3">
            {{ item.name }}
          </p>
          <div class="white mt-n2 ml-3">
            <v-rating  :value="totalReview" readonly color="black"/>
          </div>
        </div>
      </v-card-title>
    </v-img>

    <v-card-text class="pa-0 px-md-2 bg_admin">
      <v-row class="ma-0">
        <v-col cols="12" md="3">
          <v-card shaped>
            <div
              class="black white--text pa-3 font-weight-bold  mb-2 headline text-center"
            >
              Ingredients
            </div>

            <div
              v-for="(ingredient, index) in item.ingredients"
              :key="index"
              class="pa-3"
            >
              <v-icon>mdi-food-variant</v-icon>
              <strong class="pl-3">{{ ingredient.name }}</strong> @
              {{ ingredient.quantity }}
            </div>
          </v-card>
        </v-col>
        <v-col>
          <v-card shaped>
            <div
              class="accent white--text pa-3 font-weight-bold  mb-2 headline text-center"
            >
              Cooking Description
            </div>

            <v-card-text class="subtitle-1" style="line-height: 2">
              {{ item.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col v-if="!user">
          <v-btn
            style="width: 100%"
            shaped
            x-large
            color="blue"
            class="white--text"
            :to="{ name: 'login' }"
          >
            Please Login for Review
          </v-btn>
        </v-col>
        <v-col v-if="user && checkReview">
          <v-card shaped>
            <h1
              class="warning pa-3 font-weight-bold  mb-2 headline text-center"
            >
              Review
            </h1>
            <v-card-text>
              <div>
                <p class="ma-0 subtitle-1">Give Rating</p>
                <v-rating v-model="rating" dense />
              </div>
              <v-text-field
                label="Comment"
                v-model="comment"
                outlined
                class="my-3"
              />
              <div class="text-center">
                <v-btn color="primary" x-large @click="addReview"
                  >Add Review</v-btn
                >
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-0" v-if="item.reviews">
        <v-col cols="12">
          <ReviewTotal :reviews="item.reviews.map(v => v.rating)" />
        </v-col>
        <v-col cols="12" v-for="(review, index) in item.reviews" :key="index">
          <UserReview :review="review" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
/* eslint-disable no-unused-vars */

import { realTimeDb } from "../db";
import ReviewTotal from "../components/User/ReviewTotal";
import UserReview from "../components/User/UserReview";

export default {
  name: "Detail",
  components: { UserReview, ReviewTotal },
  props: ["user"],
  data: () => ({
    item: {},
    rating: 0,
    comment: "",
    overlay: true
  }),
  mounted() {
    if (!this.user){
      this.$router.push({name:'login'})
    }
    let { uid, id } = this.$route.params;
    let db = realTimeDb.ref("recipes/" + uid + "/" + id);
    db.on("child_added", snapshot => {
      this.item = { ...this.item, ...{ [snapshot.key]: snapshot.val() } };
    });
    db.on("child_changed", snapshot => {
      // console.log({ ...this.item, ...{ [snapshot.key]: snapshot.val() } })
      this.item = { ...this.item, ...{ [snapshot.key]: snapshot.val() } };
    });
  },
  computed: {
    checkReview() {
      if (this.item.reviews && this.item.reviews.length) {
        // console.log(this.item)
        if (this.item.reviews.filter(v => v.user.id == this.user.uid).length) {
          return false;
        }
      }
      return true;
    },
    checkBookMark() {
      if (this.item.saved && this.item.saved.length) {
        // console.log(this.item)

        if (this.item.saved.filter(v => v.user.id == this.user.uid).length) {
          return false;
        }
      }
      return true;
    },
    totalReview() {
      if (this.item && this.item.reviews){
        let totalStar = this.item.reviews.map(v=>v.rating).reduce((t,v)=>t+=v,0)

        return Number(totalStar/this.item.reviews.length).toFixed(1)*1
      }
      return 0;

    }
  },
  // updated() {
  //   if (this.user==null){
  //     this.$router.push({name:'login'})
  //   }
  // },
  methods: {
    getDetail() {},
    async addReviewmain() {
      if (this.rating === "" || this.comment === "") {
        return alert("Please fill rating and comment.");
      }
      let { uid, id } = this.$route.params;
      let db = realTimeDb.ref("recipes/" + uid + "/" + id + "/reviews");
      let data = {
        rating: this.rating,
        comment: this.comment,
        user: {
          id: this.user.uid,
          name: this.user.displayName,
          email: this.user.email
        },
        createdAt: Date.now()
      };

      let oldReviews = this.item.reviews
        ? this.item.reviews.filter(v => v != undefined)
        : [];
      // data = {reviews:[data,...oldReviews]}
      data = [data, ...oldReviews];
      await db.set(data);
    },
    async addReview() {
      if (this.rating === "" || this.comment === "") {
        return alert("Please fill rating and comment.");
      }
      let { uid, id } = this.$route.params;
      let db = realTimeDb.ref("recipes/" + uid + "/" + id);
      let data = {
        rating: this.rating,
        comment: this.comment,
        user: {
          id: this.user.uid,
          name: this.user.displayName,
          email: this.user.email
        },
        createdAt: Date.now()
      };

      let oldReviews = this.item.reviews
        ? this.item.reviews.filter(v => v != undefined)
        : [];
      data = { reviews: [data, ...oldReviews] };
      await db.update(data);
    },
    async saveBookMark() {
      let { uid, id } = this.$route.params;
      let db = realTimeDb.ref("recipes/" + uid + "/" + id);
      let data = {
        user: {
          id: this.user.uid,
          name: this.user.displayName,
          email: this.user.email
        },
        createdAt: Date.now()
      };
      let oldSaved = this.item.saved
        ? this.item.saved.filter(v => v != undefined)
        : [];
      data = { saved: [data, ...oldSaved] };
      // console.log(data);
      await db.update(data);
    }
  },
  beforeDestroy() {
    this.item = [];
  },
  watch: {
    item(val) {
      if (Object.keys(val).length) {
        this.overlay = false;
      }
    }
  }
};
</script>

<style scoped></style>
