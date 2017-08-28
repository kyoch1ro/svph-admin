import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { ISurveyDuration } from '../shared/survey.interface';
import { AuthService } from '../../core/services/auth.service';
import { apiUrl } from '../../core/global.const';
import { HttpHelper } from '../../core/helpers/http-helper';
import { ISurveyDurationService } from '../../core/contracts/i-http-services';

import { Injectable } from '@angular/core';

@Injectable()
export class DurationService implements ISurveyDurationService<ISurveyDuration> {

  constructor(private _http: Http) { }

    getById(id: number): Observable<ISurveyDuration> {
      return
    }
    list(id?: number): Observable<ISurveyDuration> {
      return
    }
    add(item: ISurveyDuration): Observable<ISurveyDuration> {
      const token = AuthService.getToken();
      return this._http.post(`${apiUrl}/duration?token=${token}`, item, HttpHelper.RequestOptions).map(data => data.json());
    }
    delete(id: number): Observable<ISurveyDuration> {
      return
    }
    update(item: ISurveyDuration): Observable<ISurveyDuration> {
      const token = AuthService.getToken();
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-HTTP-Method-Override', 'PUT');
      const options = new RequestOptions({
        headers: headers
      })
      return this._http.post(`${apiUrl}/duration/${item.id}?token=${token}`,
        JSON.stringify(item), options).map(data => data.json());
    }
    count(): Observable<ISurveyDuration> {
      return
    }
}



export const SURVEY_DURATION_PROVIDERS: Array<any> = [
  { provide: DurationService , useClass: DurationService }
]


