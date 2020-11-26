import Vue from "vue";
import VueRouter from "vue-router";
// import PlainLayout from "./PlainLayout";
// import MainLayout from "./MainLayout";
Vue.use(VueRouter);

// const routes = [...MainLayout, ...PlainLayout];
const routes = [
  {
    path: "/",
    component: () => import("./../views/Home"),
    name: "home",
    meta:{
      title:"Home"
    }
  },
  {
    path: "/Detail/:uid/:id",
    name: "detail",
    component: () => import("./../views/Detail.vue"),
    meta:{
      title:"Detail"
    }
  },
  {
    path: "/Login",
    name: "login",
    component: () => import("./../views/Auth/Login.vue")
  },
  {
    path: "/Dashboard",
    name: "dashboard",
    component: () => import("./../views/User/Dashboard.vue"),
    meta:{
      title:"Dashboard"
    }
  },
  {
    path: "/Recipe",
    name: "recipe",
    component: () => import("./../views/User/RecipeList.vue"),
    meta:{
      title:"Recipes"
    }
  },
  {
    path: "/Create-Recipe",
    name: "create_recipe",
    component: () => import("./../views/User/CreateRecipe.vue"),
    meta:{
      title:"Create Recipes"
    }
  },
  {
    path: "/Save-Recipe",
    name: "save_recipe",
    component: () => import("./../views/User/SaveRecipe.vue"),
    meta:{
      title:"Save Recipes"
    }
  }
];

const router = new VueRouter({
  routes
});

export default router;
