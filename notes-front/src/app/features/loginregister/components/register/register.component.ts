import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from "@angular/forms";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  registerUserFormGroup: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

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
    return pass === confirmPass ? null : group.controls.confirmPassword.setErrors({ notSame: true });
  }
  // Register User
  registerUser() {
    console.log('working')
  }
}
