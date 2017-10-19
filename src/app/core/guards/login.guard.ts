import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { iAuth } from 'app/core/contracts/iAuth';
import { AuthService } from 'app/core/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {


  constructor(@Inject(AuthService) private _auth: iAuth,
              private router: Router){ }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this._auth.isLoggedIn().map(
        authenticated => {
          if (authenticated) {
              return true;
          }
          this.router.navigate(['/login']);
          return false;
        }
      )
      .take(1);
  }
}
