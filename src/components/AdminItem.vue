<template>
  <div class="backdrop">
    <div class="row justify-center items-center full-height">
      <div class="form add-product relative-position">
        <q-btn
          to="/"
          class="close-btn"
          flat
          dense
          icon="close"
          color="primary"
        />
        <q-card flat class="bg-transparent text-white auth-form">
          <q-card-section>
            <h6 class="q-mt-none q-mb-sm text-h6 text-center auth-form-title">
              Product
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
                v-model="form.Name"
                type="text"
                color="secondary"
                label="Name"
                required
                lazy-rules
              />

              <q-input
                v-model.number="form.Price"
                color="secondary"
                type="number"
                label="Price"
                required
              />

              <q-file
                v-if="!form.ImageUrl"
                dense
                v-model="file"
                label="Pick file"
                :rules="[(val) => val || 'Pick file']"
              />
              <q-file
                v-if="form.ImageUrl"
                dense
                v-model="file"
                label="Pick file"
              />

              <div class="q-mt-lg" style="text-align: end">
                <q-btn
                  :to="{ name: 'AdminProducts' }"
                  dense
                  flat
                  color="primary"
                  size="md"
                  label="Cancel"
                  no-caps
                  class="q-mr-md"
                />
                <q-btn
                  v-if="!spinner"
                  dense
                  label="OK"
                  type="submit"
                  color="secondary"
                  class="auth-btn login-btn q-px-sm"
                  size="md"
                />

                <q-btn v-if="spinner" dense color="secondary" class="q-px-xs"
                  ><q-spinner-ios size="1em" :thickness="2"
                /></q-btn>
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AdminItem",
  data() {
    return {
      file: null,
      form: {
        Name: "",
        Price: 0,
        Qty: 1,
      },
      spinner: false,
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.getItem();
    }
  },
  methods: {
    ...mapActions("admin", ["createProduct", "updateProduct"]),
    getItem() {
      this.$axios
        .get(`admin/item/${this.$route.params.id}`)
        .then((result) => {
          this.form = result.data;
          console.log(this.form);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSubmit() {
      this.spinner = true;
      if (this.$route.params.id) {
        this.updateProduct({
          id: this.$route.params.id,
          form: {
            Name: this.form.Name,
            Price: this.form.Price,
            Qty: this.form.Qty,
            File: this.file,
          },
        }).then(() => {
          this.$router.push({ name: "AdminProducts" });
          this.spinner = false;
        });
      } else {
        this.createProduct({
          Name: this.form.Name,
          Price: this.form.Price,
          Qty: this.form.Qty,
          File: this.file,
        }).then(() => {
          this.$router.push({ name: "AdminProducts" });
          this.spinner = false;
        });
      }
    },
    url(form) {
      return `http://localhost:3000/${form.ImageUrl}`;
    },
  },
};
</script>

<style lang="scss">
.add-product {
  background: #fff;
  border-radius: 3px;
}
</style>