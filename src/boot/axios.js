import Vue from "vue";
import axios from "axios";
import auth from "../services/auth";
import { Notify } from 'quasar'
 
Vue.prototype.$axios = axios;

axios.defaults.baseURL = process.env.API_URL;
axios.defaults.headers.common[`Content-Type`] = "application/json";

export default ({ Vue, router, store }) => {
  //   Vue.prototype.$axios = axiosInstance;
  axios.interceptors.request.use(config => {
    var token = auth.getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
      config.headers["Cache-Control"] = "no-cache";
    }

    return config;
  });

  axios.interceptors.response.use(
    function(config) {
      return config;
    },
    function(err) {
       Notify.create({
        position: 'bottom-right',
        message: err.response.statusText,
        color: 'red'
      })
      if (err.response.status === 401) {
        auth.removeToken();
        store.dispatch("admin/resetAdminState");
        router.push({
          name: "LandingPage"
        });
      }
      return Promise.reject(err);
    }
  );
};
