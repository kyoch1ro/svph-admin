import { DataService } from '../../core/services/data.service';
import { Injectable, Inject } from '@angular/core';
import { ITypeService } from 'app/core/contracts/i-http-services';
import { Observable } from 'rxjs/Observable';
import { iAuth } from 'app/core/contracts/iAuth';
import { AuthService } from 'app/core/services/auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { apiUrl, baseApiUrl } from 'app/core/global.const';

@Injectable()
export class SurveyTypeService extends DataService {

  constructor(http: Http) {
    const url = `${apiUrl}/type`
    super(http, url);
  }

}
export const SURVEY_TYPE_PROVIDERS: Array<any> = [
  { provide: SurveyTypeService , useClass: SurveyTypeService }
]
