<template>
  <UserDashboard @logout="$emit('logout')">
    <v-row>
      <RecipeCard v-for="(item, index) in filterItem" :key="index" :item="item" :detail="false" :link="true" />
    </v-row>
  </UserDashboard>
</template>

<script>
import UserDashboard from "../../components/Layout/UserDashboard";
import RecipeCard from "../../components/User/RecipeCard";
import { realTimeDb } from "../../db";
export default {
  name: "SaveRecipe",
  components: { RecipeCard, UserDashboard },
  props: ["user"],
  data: () => ({
    items: []
  }),
  mounted() {
    if (this.user) {
      this.getItems();
    }else{
      this.$router.push({name:'login'})
    }
  },
  computed: {
    filterItem() {
      if (this.items) {
        let data = JSON.parse(JSON.stringify(this.items));
        data = data.reduce((total, oldValue) => {
          if (oldValue.saved) {
            let check = oldValue.saved.filter(v => v.user.id == this.user.uid);
            if (check.length) total.push(oldValue);
          }
          return total;
        }, []);
        return data;
      }
      return [];
    },
  },
  methods: {
    getItems() {
      let db = realTimeDb.ref("recipes/");
      db.on("child_added", snapshot => {
        let key = Object.keys(snapshot.val());
        key.forEach(v => {
          this.items.push({
            id: v,
            ...snapshot.val()[v],
            userId: snapshot.key
          });
        });
      });
    }
  },
  watch: {
    user(val) {
      if (val) {
        this.getItems();
      }
    }
  }
};
</script>

<style scoped></style>
