<template>
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
        <q-card-section>
          <div class="text-h6 text-primary">
            <h3>{{ item.Name }}</h3>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none" style="color: grey">
          <div>{{ item.Price }}.00 MKD</div>
        </q-card-section>

        <q-card-section class="q-pt-none row justify-between">
          <q-btn
            dense
            flat
            label="-"
            type="button"
            class="text-negative"
            style="width: 30px"
            @click="qtyMinus(item)"
          />
          <q-input
            class="text-center amount"
            v-model.number="item.Qty"
            dense
            type="number"
            value="1"
            style="max-width: 60px"
          />
          <q-btn
            dense
            flat
            label="+"
            type="button"
            class="text-negative"
            style="width: 30px"
            @click="item.Qty++"
          />
        </q-card-section>

        <q-card-section class="row q-pt-none">
          <q-btn
            flat
            dense
            class="full-width bg-primary"
            color="white"
            v-if="!isAdded(item._id)"
            type="submit"
            label="add to cart"
            @click="submitProduct(item)"
          />
          <q-btn
            v-if="spinner"
            flat
            dense
            color="white"
            class="full-width bg-primary"
            ><q-spinner-ios size="1em" :thickness="2"
          /></q-btn>
          <q-btn
            flat
            dense
            class="full-width bg-secondary"
            color="white"
            v-if="isAdded(item._id)"
            type="submit"
            label="add more"
            @click="submitProduct(item)"
          />
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Products",
  data() {
    return {
      spinner: false,
    };
  },
  computed: {
    listItems() {
      return this.$store.state.user.products;
    },
    cartProducts() {
      return this.$store.state.user.cartProducts || false;
    },
  },
  created() {
    this.getProducts();
    this.getCartProducts();
  },
  methods: {
    ...mapActions("user", ["getProducts", "addToCart", "getCartProducts"]),

    isAdded(id) {
      let result = this.cartProducts.find((p) => p.Item._id == id);
      return result ? true : false;
    },
    submitProduct(item) {
      this.spinner = true;
      this.addToCart({
        Item: item._id,
        Qty: item.Qty,
      });
      this.spinner = false;
      this.$q.notify({
        position: 'bottom-right',
        message: "Successfully added to Cart",
        color: 'green'
      })
    },
    qtyMinus(item) {
      if (item.Qty > 0) {
        item.Qty--;
      }
    },
    url(item) {
      return process.env.IMG_UPLOAD_URL + item.ImageUrl;
    },
  },
};
</script>

<style lang="scss">
.amount .q-field__native {
  border: 1px solid #f1f4f8;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
}
</style>