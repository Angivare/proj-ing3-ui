import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from "rxjs/internal/operators";
import { AuthenticationService } from '../services/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { PrivilegeLevel } from '../services/user-data.model';

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

    return next.handle(req)
    .pipe(
        catchError(error => {
        console.log("Une erreur s'est produite");
        console.log(error); // Récupérer les erreurs et les affichers
        return Observable.throw(error); // Retourner l'erreur dans tous les cas
      })) as any;
    }
}
