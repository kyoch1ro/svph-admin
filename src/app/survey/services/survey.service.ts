import { BadInputError } from '../../core/error-handlers/bad-input-error';
import { DataService } from '../../core/services/data.service';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { ISurveyService } from 'app/core/contracts/i-http-services';
import { apiUrl, baseApiUrl } from 'app/core/global.const';
import { AuthService } from 'app/core/services/auth.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SurveyService extends DataService {

  constructor(http: Http) {
    const url = `${apiUrl}/survey`;
    super(http, url);
  }

  getRespondentsCount(id: number): Observable<any> {
    const token = AuthService.getToken();
     return this.http.get(`${baseApiUrl}/userAnswerSurvey/${id}?token=${token}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(data: any): Observable<any> {
    const id = data['id'];
    if (!id) { return Observable.throw(new BadInputError('Id is not defined.'))};
    const custom_url = `${this.url}/${id}`;
    return super.update(data, custom_url);
  }

}




export const SURVEY_PROVIDERS: Array<any> = [
  { provide: SurveyService , useClass: SurveyService }
]
