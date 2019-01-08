import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Routes from "./routes";

import { Timeline } from "vue2vis";
import "vue2vis/dist/vue2vis.css";

Vue.component("timeline", Timeline);

Vue.use(VueResource);
Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: "history",
  base: process.env.BASE_URL
});

new Vue({
  el: "#app",
  render: h => h(App),
  router: router
});
