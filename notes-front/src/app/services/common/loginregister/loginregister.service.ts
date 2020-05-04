import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ConstantService } from "src/app/shared/constant/constant.service";
import { observable, Observable } from "rxjs";
import { RegisterUser, RegisterUserResponse } from "src/app/models/user.model";

@Injectable({
  providedIn: "root",
})
export class LoginregisterService {
  apiRoutes: any;
  constructor(
    private httpClient: HttpClient,
    private constantService: ConstantService
  ) {
    this.apiRoutes = ConstantService.apiRoutes;
  }
  /**
   * This is used to register New User
   * @param userData
   */
  registerUser(userData: RegisterUser): Observable<RegisterUserResponse> {
    return this.httpClient.post<RegisterUserResponse>(
      this.apiRoutes.signup,
      userData
    );
  }
}
