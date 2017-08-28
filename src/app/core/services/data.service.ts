import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { AppError } from '../error-handlers/app-error';
import { BadInputError } from '../error-handlers/bad-input-error';
import { NotFoundError } from '../error-handlers/not-found-error';
import { AuthService } from './auth.service';

@Injectable()
export class DataService {

  constructor(public http: Http, public url: string) { }

  getAll(custom_url?: string ): Observable<any> {
    const url = (custom_url) ? custom_url : this.url;
    const token = AuthService.getToken();
    return this.http.get(`${this.url}?token=${token}`)
      .map(response => response.json())
      .catch(this.handleError);
  }

  getById(id: number, custom_url?: string): Observable<any> {
    const url = (custom_url) ? custom_url : this.url;
    const token = AuthService.getToken();
    return this.http.get(`${url}/${id}?token=${token}`)
      .map(response => response.json())
      .catch(this.handleError);
  }

  create(resource): Observable<any> {
    // return Observable.throw(new AppError());
    return this.http.post(this.url, resource)
      .map(response => response.json())
      .catch(this.handleError);
  }

  update(resource): Observable<any> {
    return Observable.throw('Not implemented');
  }

  delete(id) {
    // return Observable.throw(new AppError());
    return this.http.delete(`${this.url}/${id}`)
      .map(response => response.json())
      .catch(this.handleError);
  }

  search(): Observable<any> {
    return Observable.throw('Not implemented');
  }

  count(): Observable<any> {
    return Observable.throw('Not implemented');
  }

  handleError(error: Response) {
    switch (error.status) {
      case 400:
        return Observable.throw(new BadInputError(error.json()));
      case 404:
        return Observable.throw(new NotFoundError(error.json()));
      default:
        return Observable.throw(new AppError(error.json()));
    }
  }
}