import { Injectable } from "@angular/core";
import { RegisterUser } from "src/app/models/user.model";

@Injectable({
  providedIn: "root",
})
export class CompilerService {
  constructor() {}
  constructRegisterUserObject(userData: RegisterUser) {
    let modifiedData = {
      firstname: userData.firstname,
      lastname: userData.lastname,
      username: userData.username,
      email: userData.email,
      password: userData.password,
    };
    return modifiedData;
  }
  constructLoginUserObject(userData) {
    let modifiedData = {
      email: userData.email,
      password: userData.password,
    };
    return modifiedData;
  }
  constructAfterLoginUserData(loginApiResponse) {
    let loginData = {
      userId: loginApiResponse.userId,
      superUserId: loginApiResponse.superUserId,
      username: loginApiResponse.username,
    };
    return loginData;
  }
  constructCategoriesData(data) {}
}
