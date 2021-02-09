<template>
  <div>
    <div class="shadow full-width q-pt-xl"></div>
    <div class="row justify-center items-center full-height crash-border">
      <div class="form">
        <q-card flat class="bg-transparent text-white auth-form">
          <q-card-section>
            <h6 class="q-mt-none q-mb-sm text-h6 text-center auth-form-title">
             Sign Up
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
                v-model="form.username"
                color="secondary"
                type="text"
                label="Username"
                required
                lazy-rules
              />
              <q-input
                v-model="form.email"
                color="secondary"
                type="text"
                label="Email"
                lazy-rules
              />

              <q-input
                v-model="form.password"
                color="secondary"
                type="password"
                label="Password"
                lazy-rules
              />

              <q-select
                class="q-my-md"
                v-model="form.role"
                dense
                options-dense
                selected
                :options="options"
                label="Role"
              />

              <div class="q-my-lg">
                <q-btn
                  flat
                  dense
                  label="SignUp"
                  type="submit"
                  class="auth-btn login-btn q-px-sm bg-secondary full-width"
                  size="md"
                />
              </div>

              <div>
                <q-btn
                  :to="{ name: 'Login' }"
                  dense
                  flat
                  color="primary"
                  size="md"
                  label="Already have account?"
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
export default {
  name: "Register",
  data() {
    return {
      options: ["admin", "user"],
      form: {
        username: "",
        email: "",
        password: "",
        role: "",
      },
    };
  },
  methods: {
    async onSubmit() {
      try {
        const result = await this.$axios.post("auth/register", this.form);
        this.$router.push({ name: "Login" });
      } catch (error) {}
    },
  },
};
</script>

<style>
</style>