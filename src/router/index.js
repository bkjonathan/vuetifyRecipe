import Vue from "vue";
import VueRouter from "vue-router";
// import PlainLayout from "./PlainLayout";
// import MainLayout from "./MainLayout";
Vue.use(VueRouter);

// const routes = [...MainLayout, ...PlainLayout];
const  routes = [
  {
    path: "/",
    component: () => import("./../views/Home"),
    name: "home"
  },
  {
    path: "/Login",
    name: "login",
    component: () => import("./../views/Auth/Login.vue")
  }
]

const router = new VueRouter({
  routes
});

export default router;
