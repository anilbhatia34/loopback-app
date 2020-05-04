import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";
import { CompilerService } from "src/app/shared/compiler/compiler.service";
import { LoginregisterService } from "src/app/services/common/loginregister/loginregister.service";
import { RegisterUser, RegisterUserResponse } from "src/app/models/user.model";
import { HelperService } from "src/app/shared/helper/helper.service";
import { ConstantService } from "src/app/shared/constant/constant.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerUserFormGroup: FormGroup;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private compilerService: CompilerService,
    private loginRegisterService: LoginregisterService,
    private helperService: HelperService
  ) {}

  ngOnInit() {
    this.registerUserFormGroup = this.formBuilder.group(
      {
        firstname: ["", [Validators.required]],
        lastname: ["", [Validators.required]],
        username: ["", [Validators.required]],
        email: ["", [Validators.required]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
          ],
        ],
        confirmPassword: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(30),
          ],
        ],
      },
      {
        validator: this.checkPassword,
      }
    );
  }
  /**
   * This is to check if password is same or not
   * @param group
   */
  checkPassword(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass
      ? null
      : group.controls.confirmPassword.setErrors({ notSame: true });
  }
  // Register User
  registerUser() {
    if (!this.registerUserFormGroup.invalid) {
      this.loading = true;
      let modifedData = this.compilerService.constructRegisterUserObject(
        this.registerUserFormGroup.value
      );
      this.loginRegisterService.registerUser(modifedData).subscribe(
        (response: RegisterUserResponse) => {
          this.loading = false;
          console.log(response);
        },
        (error) => {
          if (error.status === 422) {
            this.loading = false;
            this.helperService.createSnackBar(
              ConstantService.errorMessgaes.alreadyExists
            );
          }
        }
      );
    }
  }
}
