import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { iAuth } from 'app/core/contracts/iAuth';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

import { IUser } from '../contracts/i-user';
import { HttpHelper } from '../helpers/http-helper';
import { apiUrl } from './../global.const';

@Injectable()
export class AuthService implements iAuth {
  private _initialData: IUser = {
    email: '',
    firstname: '',
    id: 0,
    img: '',
    lastname: '',
    middlename: '',
    password: ''
  }
  public user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(this._initialData);
  public static getToken(): string {
     return localStorage.getItem('token') || null;
  }

  constructor(private _http: Http,
              private _route: Router) { }

  login(user: string, password: string): Observable<any> {
    return this._http.post(`${apiUrl}/signin`, {
      'email': user,
      'password': password
    }, HttpHelper.RequestOptions).map(data => data.json());
  }

  public setUserInfo() {
    const token = AuthService.getToken();
    // checkTokenValidity returns user info based on the token passed
    const userInfoSub: ISubscription =  this.checkTokenValidity().subscribe(
      data => {
        this.user.next(data.user);
      },
      err => {},
      () => userInfoSub.unsubscribe()
    )
  }
  public checkTokenValidity(): Observable<any> {
    const token = AuthService.getToken();
    return this._http.get(`${apiUrl}/checkAdminToken/${token}`, HttpHelper.RequestOptions)
    .map((res: Response) => res.json());
  }



  logout(): void {
    localStorage.removeItem('token');
    this._route.navigate(['/login']);
  }
  getUser(): string {
    return;
  }
  isLoggedIn(): Observable<boolean> {
    if (AuthService.getToken()) {
      return this.checkTokenValidity().map(() => {
        this.setUserInfo();
        return true;
      })
      .catch(() => {
        return Observable.of(false);
      })
    }else {
      return Observable.of(false);
    }
  }

  isAdmin(): boolean {
    return;
  }

  // IsValidToken(): boolean {
  //   const token = AuthService.getToken();
  //   if(!this.isLoggedIn) return false;
  //   var isValid = false;
  //   let token_sub: ISubscription = this._http.get(`${apiUrl}/checkAdminToken/${token}`)
  //   .subscribe(
  //     data=> {},
  //     err=> { isValid = false; },
  //     () => {
  //       isValid = true;
  //       token_sub.unsubscribe();
  //     }
  //   )

  //   return isValid;
  // }

}





export const AUTH_PROVIDERS: Array<any> = [
  { provide: AuthService , useClass: AuthService }
]
