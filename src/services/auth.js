import jwtDecode from "jwt-decode";
import { LocalStorage } from "quasar";

class Auth {
  saveToken(token) {
    return LocalStorage.set("shop_token", token);
  }

  getToken() {
    return LocalStorage.getItem("shop_token");
  }

  removeToken() {
    LocalStorage.remove("shop_token");
  }

  isLoggedIn() {
    return LocalStorage.has("shop_token");
  }

  getUserInfo() {
    let token = this.getToken();
    if (token) {
      let decoded = jwtDecode(token);
      return decoded;
    }

    return null;
  }
}

const auth = new Auth();

export default auth;
