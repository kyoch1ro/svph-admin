import { Injectable, Inject } from '@angular/core';
import { IOptionService } from 'app/core/contracts/i-http-services';
import { Observable } from 'rxjs/Observable';
import { iAuth } from 'app/core/contracts/iAuth';
import { AuthService } from 'app/core/services/auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { apiUrl, baseApiUrl, devBaseApiUrl } from 'app/core/global.const';

@Injectable()
export class OptionService {

  constructor(private _http: Http,@Inject(AuthService) private _auth : iAuth ) { }
  getById(id: number): Observable<any>{
    return;
  }

  list(id?: number): Observable<any>{
    return;
  }
  
  add(data: any): Observable<any>{
    const token = this._auth.getToken();
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    var options = new RequestOptions({
      headers : headers
    })
    return this._http.post(`${apiUrl}/option?token=${token}`,JSON.stringify(data),options)
          .map((res: Response) => res.json());
  }
  
  delete(id: number): Observable<any>{
    return;
  }

  
  update(data: any): Observable<any>{
    const token = this._auth.getToken();
    var headers = new Headers();
    let id = data['option_id'];
    headers.append('Content-Type', 'application/json');
    headers.append('X-HTTP-Method-Override', 'PUT');
    var options = new RequestOptions({
      headers : headers
    })
    return this._http.post(`${apiUrl}/option/${id}?token=${token}`,JSON.stringify(data),options)
          .map((res: Response) => res.json());
  }
  count(): Observable<any>{
    return;
  }

}
export const OPTION_PROVIDERS: Array<any>=[
  { provide: OptionService ,useClass: OptionService }
]