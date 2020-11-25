<template>
  <v-dialog
    v-model="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card width="400">
      <v-img height="200px" :src="item.photo">
        <v-app-bar flat color="rgba(0, 0, 0, 0)">
          <v-btn color="white" @click="dialogClose" icon>
            <v-icon>mdi-keyboard-backspace</v-icon>
          </v-btn>

          <v-spacer></v-spacer>
          <v-menu bottom left>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="white" icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="editItem">
                <v-list-item-title>Edit</v-list-item-title>
              </v-list-item>
              <v-list-item @click="deleteItem">
                <v-list-item-title>Delete</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-app-bar>

        <v-card-title class="white--text mt-8">
          <v-avatar size="56">
            <img alt="user" :src="item.photo" />
          </v-avatar>
          <p class="ml-3 primary pa-3">
            {{ item.name }}
          </p>
        </v-card-title>
      </v-img>

      <v-card-text class="pa-0 px-md-2">
        <div class="font-weight-bold ml-8 mb-2 headline">
          Ingredients
        </div>

        <v-timeline align-top dense>
          <v-timeline-item
            v-for="(ingredient, index) in item.ingredients"
            :key="index"
            small
          >
            <div>
              <div class="font-weight-normal">
                <strong>{{ ingredient.name }}</strong> @
                {{ ingredient.quantity }}
              </div>
              <!--              <div>{{ ingredient.name }} - {{ ingredient.quantity }}</div>-->
            </div>
          </v-timeline-item>
          <v-timeline-item hide-dot>
            <div>
              <div class="headline">
                Cooking Description
              </div>
            </div>
          </v-timeline-item>
          <v-timeline-item color="pink" icon="mdi-receipt">
            <div>
              <div class="subtitle-1">
                {{ item.description }}
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>

  </v-dialog>
</template>

<script>
  import {realTimeDb} from "../../db";

  export default {
  name: "ViewRecipe",
  props: ["open", "item",'user'],
  data: () => ({
    dialog: false
  }),
  methods: {
    dialogClose() {
      this.dialog = false;
      this.$emit("close", false);
    },
    editItem(){
      this.dialogClose();
      this.$emit('edit',this.item)
    },
    async deleteItem() {
      this.$emit('delId' ,this.item.id);
      let db = realTimeDb.ref('recipes/'+this.user.uid+'/'+this.item.id);
      await db.remove();
      this.dialogClose();
    }
  },
  watch: {
    open(val) {
      this.dialog = val;
    }
  }
};
</script>

<style scoped></style>
