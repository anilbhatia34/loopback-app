import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class ConstantService {
  constructor() {}

  static apiRoutes = {
    login: `${environment.apiUrl}/appusers/login`,
    signup: `${environment.apiUrl}/appusers`,
    sendverifyemail: `${environment.apiUrl}/appusers/sendEmail`,
  };

  static apiMethod = {
    get: "get",
    post: "post",
    put: "put",
    delete: "delete",
  };
  static localStorageKeys = {
    token: "User_Token",
    userData: "User_Data",
  };
  static errorMessgaes = {
    noEmailExist: "Invalid Information",
    unknownError: "Unknown Error, Please try again later",
    formError: "Form Error",
    checkMail: "Email sent to you",
    catagoryExist: "Catagory with same name exist",
    noteExist: "Note exist with same title",
    notVerified: "Email not verified",
    currentPassword: "Invalid current password",
    alreadyExists: "User already Register with us ",
  };
  static successMessage = {
    userLoggedIn: "user has logged in",
  };
}
