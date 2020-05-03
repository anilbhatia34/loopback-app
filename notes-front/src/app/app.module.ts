import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { MaterialModule } from "./shared/module/material/material.module";
import { PageNotFoundComponent } from "./components/page-not-found/page-not-found.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToasterComponent } from "./components/toaster/toaster.component";
import { TokeninterceptorService } from "./services/core/interceptor/tokeninterceptor.service";
import { AuthGuardService } from "./services/core/guards/auth-guard.service";
import { AuthService } from "./services/core/auth/auth.service";
@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, ToasterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
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
  bootstrap: [AppComponent],
  entryComponents: [ToasterComponent],
})
export class AppModule {}
