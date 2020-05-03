import { Injectable } from "@angular/core";

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class TokeninterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.getToken()) {
      req = req.clone({
        setHeaders: {
          Authorization: `${this.authService.getToken()}`,
          "content-type": "application/json",
        },
      });
    }
    return next.handle(req);
  }
}
