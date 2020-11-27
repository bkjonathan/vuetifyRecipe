<template>
  <UserDashboard @logout="$emit('logout')" >
    <v-row>
      <RecipeCard
        v-for="(item, index) in items"
        :key="index"
        :item="item"
        @data="openDetail"
      />
      <ViewRecipe
        :item="singleItem"
        :open="detailToggle"
        @close="detailToggle = false"
        @edit="editDetail"
        :user="user"
        @delId="id => (delId = id)"
      />
      <EditRecipe
        :itemEdit="editItem"
        :open="editToggle"
        @close="editToggle = false"
        :user="user"
        @editId="id => (editId = id)"
      />
    </v-row>
    <v-fab-transition>
      <v-btn
        color="pink"
        dark
        fixed
        fab
        right
        :to="{ name: 'create_recipe' }"
        style="bottom: 120px"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-fab-transition>
  </UserDashboard>
</template>

<script>
/* eslint-disable no-unused-vars */

import UserDashboard from "../../components/Layout/UserDashboard";
import RecipeCard from "../../components/User/RecipeCard";
import { realTimeDb } from "../../db";
import ViewRecipe from "../../components/User/ViewRecipe";
import EditRecipe from "../../components/User/EditRecipe";

export default {
  name: "RecipeList",
  props: ["user"],
  components: { EditRecipe, ViewRecipe, RecipeCard, UserDashboard },
  data: () => ({
    items: [],
    singleItem: {},
    editItem: {},
    detailToggle: false,
    editToggle: false,
    delId: "",
    editId: ""
  }),
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
        let index = this.items.findIndex(v=>v.id == snapshot.key);
        Object.assign(this.items[index],data)
      });

      db.on("child_removed", snapshot => {
        let index = this.items.findIndex(v => v.id == this.delId);
        this.items.splice(index, 1);
      });
    },
    openDetail(item) {
      this.singleItem = item;
      this.detailToggle = true;
    },
    editDetail(item) {
      this.editItem = item;
      this.editToggle = true;
    }
  },
  watch: {
    user(val) {
      if (val) {
        console.log(val);
        this.getItems(val.uid);
      }
    }
  }
};
</script>

<style scoped></style>
