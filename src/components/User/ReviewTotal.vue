<template>
  <v-card shaped class="pa-3">
    <v-row>
      <v-col cols="12">
        <div class="headline text-center">Reviews</div>
      </v-col>
      <v-col cols="2" class="text-center">
        <div class="display-2">{{totalReview}}</div>
        <div>
          <v-rating :value="(totalReview*1)" half-increments  dense />
        </div>
        <div>
          <v-icon>mdi-account</v-icon>
          {{this.reviews.length}} total
        </div>
      </v-col>
      <v-col cols="8">
        <div class="d-flex align-center pb-3">
          <span class="mr-5">5</span>
          <v-progress-linear color="green" height="20"  :value="getCount(5)" />
        </div>
        <div class="d-flex align-center pb-3">
          <span class="mr-5">4</span>
          <v-progress-linear color="teal" height="20" :value="getCount(4)" />
        </div>
        <div class="d-flex align-center pb-3">
          <span class="mr-5">3</span>
          <v-progress-linear color="warning" height="20" :value="getCount(3)" />
        </div>
        <div class="d-flex align-center pb-3">
          <span class="mr-5">2</span>
          <v-progress-linear color="orange" height="20" :value="getCount(2)" />
        </div>
        <div class="d-flex align-center pb-3">
          <span class="mr-5">1</span>
          <v-progress-linear color="error" height="20" :value="getCount(1)" />
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "ReviewTotal",
  props: ["reviews"],
  computed: {
    totalReview() {
        let totalStar = this.reviews.reduce((t,v)=>t+=v,0)

      return Number(totalStar/this.reviews.length).toFixed(1)
    }
  },
		methods:{
      getCount(star){
          let total = this.reviews.filter(v=>v === star).length;
          return (total/this.reviews.length) *100;
			}
		}
};
</script>

<style scoped></style>
