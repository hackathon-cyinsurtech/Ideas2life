import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router/src/router_state';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService } from 'ngx-webstorage';
import { AppGlobals } from './model/app-globals';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private localStorage: LocalStorageService,
              private router: Router,
              private appGlobals: AppGlobals) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (route.queryParams && route.queryParams.jwt) {
      this.localStorage.store('jwt', route.queryParams.jwt);
      this.router.navigate([], {replaceUrl: true}).then();
      this.appGlobals.setDispatchedJwtToken(true);
    } else {
      if (this.localStorage.retrieve('jwt')) {
        this.appGlobals.setDispatchedJwtToken(true);
      } else {
        this.router.navigate(['/login']).then();
        return false;
      }
    }
    return true;
  }
}
