<template>
  <v-card class="mx-auto" @click="$router.push({name:'detail',params:{uid:item.userId,id:item.id}})">
    <v-img
      height="250"
      :src="item.photo"
      :aspect-ratio="1"
    ></v-img>

    <v-card-title>{{item.name}}</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-col cols="12" class="pa-0">
          By {{item.user.displayName}}
        </v-col>
        <v-col cols="12" class="d-flex pa-0" v-if="item.reviews">
          <v-rating
                  :value="totalReview"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
          ></v-rating>

          <div class="grey--text ml-4">
            {{totalReview}} ({{item.reviews.length}})
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "HomeCard",
		props:['item'],
  computed: {
    totalReview() {
      let totalStar = this.item.reviews.map(v=>v.rating).reduce((t,v)=>t+=v,0)

      return Number(totalStar/this.item.reviews.length).toFixed(1)*1
    }
  },
  methods:{
    // getCount(star){
    //   let total = this.reviews.filter(v=>v === star).length;
    //   return (total/this.reviews.length) *100;
    // }
  }
};
</script>

<style scoped></style>
