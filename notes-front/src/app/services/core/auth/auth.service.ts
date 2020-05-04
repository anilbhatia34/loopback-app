import { Injectable } from "@angular/core";
import { ConstantService } from "src/app/shared/constant/constant.service";
import { Router } from "@angular/router";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  storagekey = ConstantService.localStorageKeys.token;
  userDataKey = ConstantService.localStorageKeys.userData;
  logout_success: string;
  logout_msg: string;
  constructor(private router: Router) {}

  /**
   * for logout user and navigate to login page
   */
  logoutuser() {
    localStorage.clear();
    this.removeToken();
    this.router.navigate(["/login"]);
  }
  /**
   * this function used to return the token which user get on login
   */
  getToken() {
    return localStorage.getItem(this.storagekey);
  }
  /**
   * user set the token when login
   * @param token
   */
  setToken(token: string) {
    localStorage.setItem(this.storagekey, token);
  }
  removeToken() {
    localStorage.removeItem(this.storagekey);
    localStorage.removeItem(this.userDataKey);
  }

  isAuthenticated(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}
