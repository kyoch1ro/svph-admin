import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { apiUrl } from './../global.const';
import 'rxjs/add/operator/map'
import { iAuth } from 'app/core/contracts/iAuth';
import { Router } from '@angular/router';

@Injectable()
export class AuthService implements iAuth{
  private _url : string =  apiUrl;
  constructor(private _http: Http,
              private _route: Router) { }

  login(user: string, password: string): Observable<any>{
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var options = new RequestOptions({
        headers : headers
    });
    return this._http.post(`${this._url}/signin`,{
      'email': user,
      'password': password
    }, options).map(data => data.json());
  }

  logout(): void{
    localStorage.removeItem('token');
    this._route.navigate(['/login']);
  }
  getUser(): string{
    return;
  }
  isLoggedIn(): boolean{
    return this.getToken() !== null;
  }
  getToken(): string{
     return localStorage.getItem('token') || null;
  }
  isAdmin(): boolean{
    return;
  }
}





export const AUTH_PROVIDERS: Array<any>=[
  { provide: AuthService ,useClass: AuthService }
]
