import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {tap} from "rxjs/operators";

@Injectable({providedIn: "root"})
export class ExtendedHttpInterceptor implements HttpInterceptor {
  constructor(
    private _router: Router,
    private authService: AuthService
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
        "Content-Type": "application/json",
      }
    })
    return next.handle(req).pipe(
      tap((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          // console.log('processing response', ev);
        }
      }),
      // retry(3),
      catchError(response => {
        if (response instanceof HttpErrorResponse) {
          if (response.status === 401) {
            // if (response.status === 401 || response.statusText === "Unknown Error") {
          }
        }
        return throwError(response);
      })
    );
  }
}
