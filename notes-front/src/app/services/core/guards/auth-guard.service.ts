import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";
import { ConstantService } from "src/app/shared/constant/constant.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate() {
    if (this.authService.getToken()) {
      return true;
    } else {
      if (this.router.url === "/register") {
        return true;
      } else {
        this.router.navigate(["/login"]);
        return false;
      }
    }
  }
}
