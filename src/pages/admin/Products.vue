<template>
  <div v-if="listItems">
    <div>
      <q-btn
        flat
        dense
        no-caps
        color="secondary"
        size="lg"
        class="text-weight-regular q-ma-md"
        label="Add Product"
        :to="{ name: 'AdminItem' }"
      />
    </div>

    <div>
      <h1 class="text-primary q-mx-md">My products ({{ listItems.length }})</h1>
    </div>

    <div class="row crash-border">
      <div
        class="col-xs-12 col-sm-6 col-md-3 q-pa-md"
        v-for="item in listItems"
        :key="item._id"
      >
        <q-card
          class="column justify-between transition-top-hover shadow-xs-secondary product full-height"
        >
          <q-card-section>
            <div v-if="item.ImageUrl">
              <img class="main-image" :src="url(item)" :alt="item.ImageUrl" />
            </div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <div class="text-h6 text-primary">
              <h3>{{ item.Name }}</h3>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none" style="color: grey">
            <div>{{ item.Price }}.00 MKD</div>
          </q-card-section>

          <q-card-section class="row q-pt-none">
            <q-btn
              dense
              type="button"
              label="edit"
              color="positive"
              class="col-6"
              outline
              :to="{ name: 'AdminItem', params: { id: item._id } }"
            />
            <q-btn
              flat
              dense
              type="button"
              label="delete"
              color="negative"
              class="col-6"
              @click="productToBeDelete(item)"
            />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- DELETE DIALOG -->

    <q-dialog v-model="open" v-if="productToDelete" class="bg-white">
      <q-card>
        <q-card-section class="q-pb-none">
          <div class="text-h6 text-primary">
            Are you sure you want to delete this product?
          </div>
        </q-card-section>
        <q-card-section class="text-center q-pb-none text-dark">
          <div class="col text-h6 text-center">{{ productToDelete.Name }}</div>
          <div class="text-grey">{{ productToDelete.Price }}.00 MKD</div>
        </q-card-section>

      <q-card-section class="text-center">
        <img style="object-fit: cover; border-radius: 3px" height="150" width="150" :src="url(productToDelete)" :alt="url(productToDelete)">
      </q-card-section>

        <q-card-section class="text-right">
          <q-btn flat dense no-caps label="Cancel" color="dark" class="q-mr-md" @click="open = false"/>
          <q-btn v-if="!spinner" flat dense label="OK" color="secondary" @click="deleteListProduct(productToDelete._id)"/>
          <q-spinner-ios size="1em" :thickness="2" v-if="spinner"/>
        </q-card-section>
      </q-card>
    </q-dialog>

    <router-view />
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AdminProducts",
  data() {
    return {
      productToDelete: null,
      open: true,
      spinner: false,
    };
  },
  created() {
    this.getProducts();
  },
  computed: {
    listItems() {
      return this.$store.state.admin.products;
    },
    url() {
      return (item) => {
        return `http://localhost:3000/${item.ImageUrl}`;
      };
    },
  },
  methods: {
    ...mapActions("admin", ["getProducts", "deleteProduct"]),
    ...mapActions("user", ["deletePublicProduct"]),
    deleteListProduct(id) {
      this.spinner = true;
      this.deleteProduct(id);
      this.deletePublicProduct(id);
      this.spinner = false;
      this.open =  false
    },
    productToBeDelete(item) {
      this.productToDelete = item;
      this.open = true;
    },
  },
};
</script>

<style lang="scss">
</style>