<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="shadow bg-white" reveal :reveal-offset="100">
      <div class="content-wrapper">
        <div class="inner-content">
          <div class="row justify-between items-center text-primary">
            <div class="row items-center">
              <img
                class="q-mr-sm"
                src="~assets/logo.png"
                alt="user"
                width="50"
                height="50"
              />

              <h2 class="text-uppercase">Joyce Ash Shop</h2>
            </div>
            <div>
              <q-btn
                :to="{ name: 'Products' }"
                class="q-pa-sm"
                flat
                dense
                label="Go to Public Site"
                color="primary"
              />
              <q-btn-dropdown flat dense color="secondary" icon="person">
               <div class="q-px-md">
                  <div
                  class="text-subtitle1 text-center text-primary q-mt-md q-mb-xs"
                >
                  {{ username }}
                </div>
                <q-separator inset class="full-width q-my-sm" />

                <div class="column items-center">
                  <q-btn
                    label="logout"
                    v-close-popup
                    color="primary"
                    flat
                    dense
                    @click="logOut"
                  />
                </div>
               </div>
              </q-btn-dropdown>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import auth from "../services/auth";
import { mapActions } from "vuex";
import { Notify } from "quasar";

export default {
  name: "MainLayout",
  components: {},
  data() {
    return {};
  },
  computed: {
    username() {
      let user = auth.getUserInfo();
      return user && user.username;
    },
  },
  methods: {
    ...mapActions("admin", ["resetAdminState"]),
    logOut() {
      auth.removeToken();
      this.resetAdminState();
      this.$router.push({ name: "LandingPage" });
       Notify.create({
          position: 'bottom-right',
          message: 'Sucessfully logged out',
          color: 'green'
        })
    },
  },
};
</script>

<style lang="scss" scoped>
.to-public-site {
  font-size: 24px;
}
</style>
