import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ActivationResponse } from './types';
import { AuthenticationService } from '../services/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class PrivilegeLevelGuard implements CanActivate {
  constructor(
    public authService: AuthenticationService
  ) {}

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): ActivationResponse
  {
      const opts = next.data;
      const level = this.authService.getPrivilegeLevel();

      if(opts.level && !opts.level.includes(level))
      return false;
    
    return true;
  }
  
}
