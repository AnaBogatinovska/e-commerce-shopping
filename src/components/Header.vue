<template>
  <q-header class="shadow bg-white" reveal :reveal-offset="100">
    <div class="content-wrapper">
      <div class="inner-content">
        <div class="row justify-between items-center">
          <div class="flex items-center">
            <img src="~/assets/logo.png" alt="logo" width="100" height="80" />
            <h1 class="title text-uppercase">Joyce-Ash-Shop</h1>
          </div>
          <div>
            <q-btn
            flat
            dense
            label="Products"
            :to="{ name: 'Products' }"
            class="q-mr-md"
          />
            <q-btn
            v-if="isAdmin"
            flat
            dense
            icon-right="login"
            label="admin panel"
            :to="{ name: 'AdminProducts' }"
          />
          </div>

          <div>
            <div class="row items-center">
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
              <div class="relative-position">
                <q-btn
                  flat
                  dense
                  outline
                  class="q-px-xs"
                  icon="shopping_cart"
                  :to="{ name: 'CartProducts' }"
                />
                <div class="counter absolute-top-right text-white bg-negative">{{ cartLength }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </div>
    </div>
  </q-header>
</template>

<script>
import auth from "../services/auth";
import { mapActions } from "vuex";
import { Notify } from "quasar";


export default {
  name: "Header",
  data() {
    return {};
  },
  computed: {
    user() {
      return auth.getUserInfo();
    },
    username() {
      let a = auth.getUserInfo();
      return a && a.username;
    },
    isAdmin() {
      return this.user && this.user.role === "admin";
    },

    cartLength() {
      return this.$store.state.user.cartProducts.filter(
        (p) => p.UserId === this.user.id
      ).length;
    },
  },
  methods: {
    ...mapActions("user", ["resetUserState"]),
    shouldShow() {
      return this.$route.name === "LandingPage" ||
        this.$route.name === "Login" ||
        this.$route.name === "Register"
        ? false
        : true;
    },
    adminOrUser() {
      return this.user && this.user.role === "admin" ? "admin" : "user";
    },
    logOut() {
      auth.removeToken();
      this.resetUserState();
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
.q-layout__section--marginal {
  background-color: transparent;
  color: $primary;
}
.title {
  font-family: monospace;
  letter-spacing: 2px;
  font-weight: 600;
}
// .line {
//   height: 3px;
//   background: #eb8a5f;
//   border-radius: 100%;
//   flex: 1;
//   max-width: 350px;
// }
.cart {
  font-size: 24px;
}

.counter {
padding: 0 3px;
font-size: 10px;
border-radius: 3px
}
</style>