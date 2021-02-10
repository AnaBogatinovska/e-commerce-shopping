<template>
  <div>
    <div class="shadow full-width q-pt-xl"></div>
    <div class="row justify-center items-center full-height crash-border">
      <div class="form">
        <q-card flat class="bg-transparent text-white auth-form">
          <q-card-section>
            <h6
              class="q-mt-none q-mb-sm text-h6 text-center text-primary auth-form-title"
            >
              Sign in
            </h6>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-form
              @submit="onSubmit"
              class="q-gutter-xs transparent-form"
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
            >
              <q-input
                class="q-mb-md"
                v-model="form.user"
                color="secondary"
                label="Username or email"
                dense
                required
                lazy-rules
              />

              <q-input
                class="q-mb-md"
                v-model="form.password"
                color="secondary"
                type="password"
                label="Password"
                dense
                required
                lazy-rules
              />

              <div class="q-my-lg">
                <q-btn
                  flat
                  dense
                  label="Login"
                  type="submit"
                  class="auth-btn login-btn q-px-sm bg-secondary full-width"
                  size="md"
                />
              </div>

              <div>
                <q-btn
                  :to="{ name: 'Register' }"
                  dense
                  flat
                  color="primary"
                  size="md"
                  label="Don't have an account yet?"
                  no-caps
                  class="q-mr-md full-width text-center"
                />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import auth from "../../services/auth";
import { mapActions } from "vuex";
import { Notify } from "quasar";
export default {
  name: "Login",
  data() {
    return {
      form: {
        user: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("user", ["resetUserState"]),
    ...mapActions("admin", ["resetAdminState"]),
    async onSubmit() {
      try {
        const result = await this.$axios.post("auth/login", this.form);
        auth.saveToken(result.data);
        const user = auth.getUserInfo();
        this.resetUserState();
        this.resetAdminState();
        if (user.role === "admin") {
          this.$router.push("/admin/products");
        } else {
          this.$router.push("/products");
        }
        Notify.create({
          position: 'bottom-right',
          message: 'Sucessfully logged in',
          color: 'green'
        })
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss">
</style>