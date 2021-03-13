<template>
  <div>
    <h2 class="text-uppercase text-primary q-ml-md q-mt-md">cart products</h2>
    <div class="row crash-border">
      <div class="col-xs-12 col-sm-6">
        <div v-if="!cartItems.length" class="q-px-md">
          <h2 class="text-dark q-mb-lg">Your cart is empty</h2>
          <q-btn dense color="secondary" :to="{ name: 'Products' }" label="Go shop" icon="shopping" style="width: 300px"/>
        </div>
        <div class="q-pa-sm" v-for="item in cartItems" :key="item.Item._id">
          <q-card
            class="transition-top-hover shadow-xs-secondary product full-height"
          >
            <q-card-section class="row items-center justify-between flex-wrap">
              <div class="row items-center text-primary">
                <img
                  class="q-mr-md"
                  style="object-fit: cover; border-radius: 50%"
                  width="35"
                  height="35"
                  :src="url(item)"
                  :alt="item.Item.ImageUrl"
                />

                <h3>{{ item.Item.Name }}</h3>
              </div>

              <div class="row items-center">
                <div class="text-grey">
                  {{ item.Item.Price }}.00 MKD
                </div>
                <div class="row justify-between q-mx-md">
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
                </div>
              <q-btn
                flat
                dense
                class="bg-secondary"
                color="white"
                type="submit"
                icon="close"
                @click="delProduct(item._id)"
              />
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>

      <div class="col-xs-12 col-sm-6 q-px-md mt-xs">
        <div>
          <h2 class="text-primary">Summary</h2>

          <div
            v-for="item in cartItems"
            :key="item.Item._id"
            class="q-my-sm q-pa-xs text-primary"
          >
            <span
              >{{ item.Item.Name }}
              <span style="font-size: 16px">x{{ item.Qty }}</span></span
            >
            <span> - </span>
            <span class="text-secondary">
              {{ itemCost(item.Item.Price, item.Qty) }}.00 MKD</span
            >
          </div>

          <div class="row justify-between items-center">
            <div class="text-dark" style="font-size: 12px">
              TOTAL:
              <span class="text-bold text-positive" style="font-size: 16px"
                >{{ sum }}.00 MKD</span
              >
            </div>
            <q-btn label="buy" flat class="bg-primary text-white" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CartProducts",
  data() {
    return {};
  },
  created() {
    this.getCartProducts();
  },
  computed: {
    cartItems() {
      return this.$store.state.user.cartProducts;
    },
    sum() {
      let sum = 0;
      this.cartItems.forEach((i) => {
        sum += i.Qty * i.Item.Price;
      });
      return sum;
    },
  },
  methods: {
    ...mapActions("user", [
      "getProducts",
      "getCartProducts",
      "updateQty",
      "deleteCartProduct",
    ]),
    qtyMinus(item) {
      if (item.Qty > 0) {
        const newQty = item.Qty - 1;
        this.updateQty({ id: item._id, qty: newQty });
      }
    },
    qtyPlus(item) {
      if (item.Qty > 0) {
        const newQty = item.Qty + 1;
        this.updateQty({ id: item._id, qty: newQty });
      }
    },
    onChange(item) {
      this.updateQty({ id: item._id, qty: item.Qty });
    },
    delProduct(itemId) {
      this.deleteCartProduct(itemId);
    },

    itemCost(price, qty) {
      return price * qty;
    },
    url(item) {
      return process.env.IMG_UPLOAD_URL + item.Item.ImageUrl;
    },
  },
};
</script>

<style lang="scss">
.test {
  top: 50%;
  right: 20%;
}
@media (max-width: $breakpoint-xs-max) {
  .mt-xs {
    margin-top: 16px;
}
}
</style>