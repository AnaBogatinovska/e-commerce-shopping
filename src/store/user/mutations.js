export const addAllProducts = (state, products) => {
  state.products = products;
};
export const deletePublicProduct = (state, productId) => {
  const idx = state.products.findIndex(p => p._id === productId);
  state.products.splice(idx, 1);
};

//cart
export const addAllCartProducts = (state, cartProducts) => {
  state.cartProducts = cartProducts;
};

export const addToCart = (state, cartProduct) => {
  const idx = state.cartProducts.findIndex(p => p._id === cartProduct._id);
  if (idx != -1) {
    state.cartProducts[idx].Qty = cartProduct.Qty;
  } else {
    state.cartProducts.push(cartProduct);
  }
};

export const updateQty = (state, cartProduct) => {
  const idx = state.cartProducts.findIndex(p => p._id === cartProduct._id);
  state.cartProducts[idx].Qty = cartProduct.Qty;
};

export const deleteCartProduct = (state, cartProductId) => {
  const idx = state.cartProducts.findIndex(p => p._id === cartProductId);
  state.cartProducts.splice(idx, 1);
};

//reset State props

export const getDefaultState = (state, defaultState) => {
  Object.assign(state, defaultState);
};
