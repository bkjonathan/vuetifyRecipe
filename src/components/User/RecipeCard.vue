<template>
  <v-col cols="12" md="3" class="mt-3">
    <v-card class="mx-auto">
      <v-img height="250" :src="item.photo" :aspect-ratio="1">
        <v-card-title style="background-color: rgba(255,255,255,0.71)">
          {{ item.name }}
        </v-card-title>

        <v-card-text style="background-color: rgba(255,255,255,0.71)">
          <v-row align="center" class="mx-0">
            <v-rating
              :value="totalReview"
              color="primary"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="ml-4">
              {{totalReview}} ({{item.reviews.length}})
            </div>
          </v-row>
        </v-card-text>
        <div style="position: absolute; bottom: 0px; right: 0px;" v-if="detail">
          <v-btn
            color="primary"
            @click="$emit('data', item)"
            large
            style="border-radius: 0px;"
            >Detail</v-btn
          >
        </div>
      </v-img>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "RecipeCard",
  props: {
    item:{},
    detail:{
      type:Boolean,
      default:()=>true
    }
  },
  computed: {
    totalReview() {
      let totalStar = this.item.reviews.map(v=>v.rating).reduce((t,v)=>t+=v,0)

      return Number(totalStar/this.item.reviews.length).toFixed(1)*1
    }
  },
  data: () => ({
    // detail: false
  })
};
</script>

<style scoped></style>
