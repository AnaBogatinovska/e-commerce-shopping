export const addProducts = (state, products) => {
  state.products = products;
};
export const addItemToProducts = (state, product) => {
  state.products.push(product);
};
export const updateProduct = (state, product) => {
  const idx = state.products.findIndex(i => i._id == product._id);
  if (idx !== -1) {
    state.products[idx].Name = product.Name;
    state.products[idx].Price = product.Price;
    state.products[idx].ImageUrl = product.ImageUrl;
  }
};
export const deleteProduct = (state, productId) => {
  const idx = state.products.findIndex(i => i._id === productId);
  state.products.splice(idx, 1);
};

//reset State props

export const getDefaultState = (state, defaultState) => {
  Object.assign(state, defaultState)
 }
 
