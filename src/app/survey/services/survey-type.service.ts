import { Injectable, Inject } from '@angular/core';
import { ITypeService } from 'app/core/contracts/i-http-services';
import { Observable } from 'rxjs/Observable';
import { iAuth } from 'app/core/contracts/iAuth';
import { AuthService } from 'app/core/services/auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { apiUrl, baseApiUrl } from 'app/core/global.const';

@Injectable()
export class SurveyTypeService implements ITypeService{

  constructor(private _http: Http,
              @Inject(AuthService) private _auth : iAuth ) { }


  getById(id: number): Observable<any>{
    return;
  }


  list(id?: number): Observable<any>{
    const token = AuthService.getToken();
    return this._http.get(`${apiUrl}/type?token=${token}`)
           .map((res: Response) => res.json());
  }

  
  add(data: any): Observable<any>{
    return;
  }
  delete(id: number): Observable<any>{
    return;
  }
  update(id: number): Observable<any>{
    return;
  }
  count(): Observable<any>{
    return;
  }
}
export const SURVEY_TYPE_PROVIDERS: Array<any> = [
  { provide: SurveyTypeService , useClass: SurveyTypeService }
]
