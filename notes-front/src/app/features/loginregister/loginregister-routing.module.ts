import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ForgetpasswordComponent } from "./components/forgetpassword/forgetpassword.component";
import { VerificationComponent } from "./components/verification/verification.component";
import { AuthGuardService } from "src/app/services/core/guards/auth-guard.service";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: "forgetPassword",
    component: ForgetpasswordComponent,
  },
  {
    path: "verification",
    canActivate: [AuthGuardService],
    component: VerificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginregisterRoutingModule {}
