import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { LoginregisterRoutingModule } from "./loginregister-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { NavbarComponent } from "src/app/components/navbar/navbar.component";
import { MaterialModule } from "src/app/shared/module/material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ForgetpasswordComponent } from "./components/forgetpassword/forgetpassword.component";
import { TokeninterceptorService } from "src/app/services/core/interceptor/tokeninterceptor.service";
import { AuthGuardService } from "src/app/services/core/guards/auth-guard.service";
import { AuthService } from "src/app/services/core/auth/auth.service";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ForgetpasswordComponent,
  ],
  imports: [
    CommonModule,
    LoginregisterRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokeninterceptorService,
      multi: true,
    },
  ],
})
export class LoginregisterModule {}
