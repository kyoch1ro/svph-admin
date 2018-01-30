import { Injectable, Inject } from '@angular/core';
import { IUserService } from 'app/core/contracts/i-http-services';
import { Observable } from 'rxjs/Observable';
import { iAuth } from 'app/core/contracts/iAuth';
import { AuthService } from 'app/core/services/auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { apiUrl } from 'app/core/global.const';
@Injectable()
export class UserService implements IUserService{

  constructor(private _http: Http,@Inject(AuthService) private _auth : iAuth ) { }

  getById(id: number): Observable<any>{
    const token = AuthService.getToken();
    return this._http.get(`${apiUrl}/userDetail/${id}?token=${token}`)
    .map((res: Response) => res.json());
  };

  approveUser(id: number): Observable<any>{
    const token = AuthService.getToken();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var options = new RequestOptions({
      headers : headers
    });
    return this._http.post(`${apiUrl}/verifyUser?token=${token}`,{
      id: id
    }, options).map(data => data.json());
  }


  usersCount() {
    const token = AuthService.getToken();
    return this._http.get(`${apiUrl}/countUser?token=${token}`).map(x => x.json());
  }

  getOtherInfo(id: number): Observable<any> {
    const token = AuthService.getToken();
    return this._http.get(`${apiUrl}/otherInfo/${id}?token=${token}`)
    .map((res: Response) => res.json());
  }

  list(id?: number): Observable<any>{
    const token = AuthService.getToken();
    return this._http.get(`${apiUrl}/listUser?token=${token}`)
    .map((res: Response) => res.json());
  };

  add(data: any): Observable<any>{
    return;
  };
  delete(id: number): Observable<any>{
    return;
  };
  update(id: number): Observable<any>{
    return;
  };
  count(): Observable<any>{
    return;
  };
}




export const USER_PROVIDERS: Array<any>=[
  { provide: UserService ,useClass: UserService }
]
