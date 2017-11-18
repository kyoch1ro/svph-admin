import { BadInputError } from '../../core/error-handlers/bad-input-error';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { apiUrl } from '../../core/global.const';
import { HttpHelper } from '../../core/helpers/http-helper';
import { AuthService } from '../../core/services/auth.service';
import { DataService } from '../../core/services/data.service';
import { Duration } from '../shared/models/duration.model';

@Injectable()
export class DurationService extends DataService {

  constructor(http: Http) {
    super(http);
    this.url = `${apiUrl}/duration`;
  }

  save(resource) {
    const id = +resource['id'];
    return (id === 0) ? this.create(resource) : this.update(resource);
  }

  update(data: Duration) {
    const id = data['id'];
    if (!id) { return Observable.throw(new BadInputError('Id is not defined.'))} ;
    const url = `${this.url}/${id}`;
    return super.update(data, url);
  }

}



export const SURVEY_DURATION_PROVIDERS: Array<any> = [
  { provide: DurationService , useClass: DurationService }
]


