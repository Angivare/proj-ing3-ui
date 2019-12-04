import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  constructor(public auth: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.token)
      req = req.clone({
          headers: new HttpHeaders({
              'Authorization': `Bearer ${this.auth.token}`
          })
      })

    return next.handle(req);
  }
}
