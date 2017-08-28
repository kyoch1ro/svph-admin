import { Injectable, Inject } from '@angular/core';
import { ISurveyService } from 'app/core/contracts/i-http-services';
import { Observable } from 'rxjs/Observable';
import { iAuth } from 'app/core/contracts/iAuth';
import { AuthService } from 'app/core/services/auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { apiUrl, baseApiUrl, devBaseApiUrl } from 'app/core/global.const';

@Injectable()
export class SurveyService implements ISurveyService {

  constructor(private _http: Http, @Inject(AuthService) private _auth: iAuth ) { }

  getById(id: number): Observable<any> {
    const token = AuthService.getToken();
     return this._http.get(`${apiUrl}/survey/${id}?token=${token}`)
      .map((res: Response) => res.json());
  }

  getRespondentsCount(id: number): Observable<any> {
    const token = AuthService.getToken();
     return this._http.get(`${baseApiUrl}/userAnswerSurvey/${id}?token=${token}`)
      .map((res: Response) => res.json());
  }

  list(id?: number): Observable<any> {
    const token = AuthService.getToken();
    return this._http.get(`${apiUrl}/survey?token=${token}`)
      .map((res: Response) => res.json());
  }

  add(data: any): Observable<any> {
    const token = AuthService.getToken();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({
      headers : headers
    })

    return this._http.post(`${apiUrl}/survey?token=${token}`, JSON.stringify(data), options)
          .map((res: Response) => res.json());
  }
  delete(id: number): Observable<any> {
    return;
  }
  update(data: any): Observable<any> {
    const token = AuthService.getToken();
    const id = data['id'];
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('X-HTTP-Method-Override', 'PUT');
    const options = new RequestOptions({
      headers : headers
    })
    return this._http.post(`${apiUrl}/survey/${id}?token=${token}`, JSON.stringify(data), options)
          .map((res: Response) => res.json());
  }
  count(): Observable<any> {
    return;
  }
}




export const SURVEY_PROVIDERS: Array<any> = [
  { provide: SurveyService , useClass: SurveyService }
]
