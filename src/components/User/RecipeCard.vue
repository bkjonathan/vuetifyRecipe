<template>
  <v-col cols="12" md="3" class="mt-3">
    <v-card class="mx-auto">
      <v-img
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        :aspect-ratio="1"
      >
        <v-card-title
          style="background-color: rgba(255,255,255,0.71)"
          >
          Cafe Badilico
        </v-card-title>


        <v-card-text style="background-color: rgba(255,255,255,0.71)">
          <v-row align="center" class="mx-0">
            <v-rating
                    :value="4.5"
                    color="primary"
                    dense
                    half-increments
                    readonly
                    size="14"
            ></v-rating>

            <div class="ml-4">
              4.5 (413)
            </div>
          </v-row>
        </v-card-text>
        <div style="position: absolute; bottom: 0px; right: 0px;">
          <v-btn color="primary" large style="border-radius: 0px;">Detail</v-btn>
        </div>
      </v-img>
    </v-card>
  </v-col>
</template>

<script>
export default {
  name: "RecipeCard"
};
</script>

<style scoped></style>
