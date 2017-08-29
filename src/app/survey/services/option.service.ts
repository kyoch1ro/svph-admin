import { BadInputError } from '../../core/error-handlers/bad-input-error';
import { DataService } from '../../core/services/data.service';
import { IQuestion } from '../shared/survey.interface';
import { Inject, Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { iAuth } from 'app/core/contracts/iAuth';
import { apiUrl } from 'app/core/global.const';
import { AuthService } from 'app/core/services/auth.service';
import { Observable } from 'rxjs/Observable';




@Injectable()
export class OptionService extends DataService {

  constructor(http: Http) {
    const url = `${apiUrl}/option`;
    super(http, url);
  }

  update(data: any): Observable<any> {
    const id = data['option_id'];
    if (!id) { return Observable.throw(new BadInputError('Id is not defined'))}
    const url = `${this.url}/${id}`;
    return super.update(data, url);
  }

  count(): Observable<any> {
    return;
  }

}
export const OPTION_PROVIDERS: Array<any> = [
  { provide: OptionService , useClass: OptionService }
]
