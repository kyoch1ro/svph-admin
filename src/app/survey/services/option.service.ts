import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { apiUrl } from 'app/core/global.const';
import { Observable } from 'rxjs/Observable';

import { BadInputError } from '../../core/error-handlers/bad-input-error';
import { DataService } from '../../core/services/data.service';




@Injectable()
export class OptionService extends DataService {

  constructor(http: Http) {
    const url = `${apiUrl}/option`;
    super(http, url);
  }


  save(resource: any) {
    const id = +resource['option_id'];
    return (id === 0) ? this.create(resource) : this.update(resource);
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
