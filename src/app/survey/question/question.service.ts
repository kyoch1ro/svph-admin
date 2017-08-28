import { Injectable, Inject } from '@angular/core';
import { IQuestionService } from 'app/core/contracts/i-http-services';
import { Observable } from 'rxjs/Observable';
import { iAuth } from 'app/core/contracts/iAuth';
import { AuthService } from 'app/core/services/auth.service';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { apiUrl, baseApiUrl, devBaseApiUrl } from 'app/core/global.const';



@Injectable()
export class QuestionService implements IQuestionService {

  constructor(private _http: Http, @Inject(AuthService) private _auth : iAuth ) { }

  getById(id: number): Observable<any>{
    return;
  }

  list(id: number): Observable<any> {
    const token = AuthService.getToken();
    return this._http.get(`${apiUrl}/surveyQuestionnaire/${id}?token=${token}`)
      .map((res: Response) => res.json());
  }

  add(data: any): Observable<any>{
    const token = AuthService.getToken();
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({
      headers : headers
    })
    return this._http.post(`${apiUrl}/question?token=${token}`,JSON.stringify(data),options)
          .map((res: Response) => res.json());
  }
  delete(id: number): Observable<any>{
    return;
  }
  update(data: any): Observable<any>{
    const token = AuthService.getToken();
    const headers = new Headers();
    const id = data['question_id'];
    headers.append('Content-Type', 'application/json');
    headers.append('X-HTTP-Method-Override', 'PUT');
    const options = new RequestOptions({
      headers : headers
    })
    return this._http.post(`${apiUrl}/question/${id}?token=${token}`,JSON.stringify(data),options)
          .map((res: Response) => res.json());
  }
  count(): Observable<any> {
    return;
  }

}
export const QUESTION_PROVIDERS: Array<any> = [
  { provide: QuestionService , useClass: QuestionService }
]
