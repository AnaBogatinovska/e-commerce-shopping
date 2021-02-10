import $axios from "axios";
import { Notify } from "quasar";

export const getProducts = async ({ state, commit }) => {
  if (state.products.length > 0) {
    return state.products;
  }
  try {
    const result = await $axios.get("admin/item");
    commit("addProducts", result.data);
  } catch (error) {
    console.log(error);
  }
};

export const createProduct = async ({ state, commit }, form) => {
  try {
    var formData = new FormData()
    formData.append("Name", form.Name)
    formData.append("Price", form.Price)
    formData.append("Qty", form.Qty)
    formData.append("File", form.File)
    const result = await $axios.post(
      "admin/item",
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    commit("addItemToProducts", result.data);
    Notify.create({
      position: "bottom-right",
      message: "Successfully created product",
      color: "green",
    });
    
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async ({ state, commit }, data) => {
  try {
    var formData = new FormData()
    formData.append("Name", data.form.Name)
    formData.append("Price", data.form.Price)
    formData.append("Qty", data.form.Qty)
    formData.append("File", data.form.File)
    const result = await $axios.put(
      `admin/item/${data.id}`,
      formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
    commit("updateProduct", result.data);
    Notify.create({
      position: "bottom-right",
      message: "Successfully updated product",
      color: "green",
    });
    
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async ({ state, commit }, id) => {
    try {
        const result = await $axios.delete(`admin/item/${id}`)
        commit("deleteProduct", id)
        Notify.create({
          position: "bottom-right",
          message: "Successfully deleted product",
          color: "green",
        });
    } catch (error) {
        console.log(error)
    }
}

//reset state
const reset = () => {
  return {
    products: []
  }
}
export const resetAdminState = ({ commit }) => {
  commit("getDefaultState", reset())
}
