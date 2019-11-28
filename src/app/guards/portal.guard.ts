import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ActivationResponse } from './types';
import { AuthenticationService } from '../services/authentication.service';
import { PrivilegeLevel } from '../services/user-data.model';

@Injectable({
  providedIn: 'root'
})
export class PortalGuard implements CanActivate {
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): ActivationResponse {
    const opts = next.data;
    const level = this.authService.getPrivilegeLevel();

    const url = opts[PrivilegeLevel[level]];
    if(url) this.router.navigateByUrl(url);

    return true;
  }
  
}
