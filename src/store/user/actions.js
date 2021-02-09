import $axios from "axios";

//Products
export const getProducts = async ({ state, commit }) => {
  if (state.products.length > 0) {
    return state.products;
  }
  try {
    const result = await $axios.get("item");
    commit("addAllProducts", result.data);
  } catch (error) {
    console.log(error);
  }
};

// Cart Products

export const getCartProducts = async ({ state, commit }) => {
  if (state.cartProducts.length > 0) {
    return state.cartProducts;
  }
  try {
    const result = await $axios.get("CartItem");
    commit("addAllCartProducts", result.data);
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async ({ state, commit }, form) => {
  try {
    const result = await $axios.post("CartItem", form);
    commit("addToCart", result.data);
  } catch (error) {
    console.log(error);
  }
};

export const updateQty = async ({ state, commit }, product) => {
  try {
    const result = await $axios.put(`CartItem/${product.id}`, {
      Qty: product.qty
    });
    commit("updateQty", result.data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteCartProduct = async ({ state, commit }, cartProductId) => {
  try {
    const result = await $axios.delete(`CartItem/${cartProductId}`);
    commit("deleteCartProduct", cartProductId);
  } catch (error) {
    console.log(error);
  }
};

export const deletePublicProduct = ({ commit }, id) => {
  commit("deletePublicProduct", id);
};

//reset state

const reset = () => {
  return {
    products: [],
    cartProducts: []
  };
};

export const resetUserState = ({ commit }) => {
  commit("getDefaultState", reset());
};
