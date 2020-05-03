import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { LoginregisterRoutingModule } from "./loginregister-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import { MaterialModule } from "src/app/shared/module/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [LoginComponent, RegisterComponent, NavbarComponent],
  imports: [
    CommonModule,
    LoginregisterRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginregisterModule {}
