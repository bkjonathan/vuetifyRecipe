import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import "./css/app.scss";
Vue.config.productionTip = false;

import VueTimeago from "vue-timeago";
import { firebaseAuth } from "./db";

Vue.use(VueTimeago, {
  name: "Timeago",
  locale: "en"
});
let app = "";
firebaseAuth.onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
});
