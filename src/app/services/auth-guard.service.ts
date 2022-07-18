import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(route: ActivatedRouteSnapshot): boolean {
    let authInfo = {
      authenticated: localStorage.getItem("key"),
    };
    if (!authInfo.authenticated) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }

  resolveRoute(): boolean {
    if(this.authService.IsLoggedIn()){
      return true;
    }else{
      this.router.navigate(['home']);
      return false;
    }
  }
}