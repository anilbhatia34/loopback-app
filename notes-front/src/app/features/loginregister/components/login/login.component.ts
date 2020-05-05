import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { HelperService } from "src/app/shared/helper/helper.service";
import { ConstantService } from "src/app/shared/constant/constant.service";
import { LoginregisterService } from "src/app/services/common/loginregister/loginregister.service";
import { CompilerService } from "src/app/shared/compiler/compiler.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginUserFormGroup: FormGroup;
  loginData: any;
  constructor(
    private formBuilder: FormBuilder,
    private helperService: HelperService,
    private loginRegisterService: LoginregisterService,
    private compilerService: CompilerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginUserFormGroup = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(30),
        ],
      ],
    });
  }

  loginUser() {
    // this.helperService.createSnackBar(
    //   ConstantService.successMessage.userLoggedIn
    // );
    if (!this.loginUserFormGroup.invalid) {
      let modifedData = this.compilerService.constructLoginUserObject(
        this.loginUserFormGroup.value
      );
      this.loginRegisterService.loginUser(modifedData).subscribe(
        (response) => {
          let verification = response.emailVerified;
          if (verification) {
            this.loginData = response;
            localStorage.setItem(
              ConstantService.localStorageKeys.token,
              this.loginData.id
            );

            let userData = this.compilerService.constructAfterLoginUserData(
              this.loginData
            );
            localStorage.setItem(
              ConstantService.localStorageKeys.userData,
              JSON.stringify(userData)
            );
            this.helperService.createSnackBar(
              ConstantService.successMessage.userLoggedIn
            );
          } else {
            this.helperService.createSnackBar(
              ConstantService.errorMessgaes.notVerified
            );
          }
        },
        (error) => {
          if (error.status == 401) {
            this.helperService.createSnackBar(
              ConstantService.errorMessgaes.noEmailExist
            );
          } else {
            this.helperService.createSnackBar(
              ConstantService.errorMessgaes.unknownError
            );
          }
        }
      );
    }
  }
}
