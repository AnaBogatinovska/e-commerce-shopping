import Vue from "vue";
import VueRouter from "vue-router";

import routes from "./routes";
import auth from "../services/auth";

Vue.use(VueRouter);

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function(/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  Router.beforeEach((to, from, next) => {
    console.log('before eachs', to.name, auth.isLoggedIn())
    if (to.matched.some(record => record.meta.requiresAuth)) {
      console.log('in meta')
      if (!auth.isLoggedIn()) {
      console.log('in loogg')

        next({
          name: "LandingLayout"
        });
      } else if (
        to.path.includes("admin") &&
        auth.getUserInfo().role === "user"
      ) {
        next({ name: "Products" });
      } else if (to.path.includes("auth")) {
        next({ name: "Products" });
      } else {
        next()
      }
    } else if (to.name === "LandingPage" && auth.isLoggedIn()) {
      console.log(';meta false')

      if (auth.getUserInfo().role === "admin") {
        next({ name: "AdminProducts" });
      } else {
        next({ name: "Products" });
      }
    } else {
      next();
    }
  });

  return Router;
}
