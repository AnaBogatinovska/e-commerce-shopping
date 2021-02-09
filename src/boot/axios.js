import Vue from "vue";
import axios from "axios";
import auth from "../services/auth";

Vue.prototype.$axios = axios;
axios.defaults.baseURL = "http://localhost:3000/api/";
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
