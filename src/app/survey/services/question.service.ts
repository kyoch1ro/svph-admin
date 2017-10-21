import { Question } from '../shared/models/question.model';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { apiUrl } from 'app/core/global.const';
import { AuthService } from 'app/core/services/auth.service';
import { Observable } from 'rxjs/Observable';

import { BadInputError } from '../../core/error-handlers/bad-input-error';
import { DataService } from '../../core/services/data.service';



@Injectable()
export class QuestionService extends DataService {

  constructor(http: Http) {
    const url = `${apiUrl}/question`;
    super(http, url);
  }

  getById(id: number): Observable<any> {
    return;
  }

  listBySurveyId(survey_id: number): Observable<Question> {
    const token = AuthService.getToken();
    return this.http.get(`${apiUrl}/surveyQuestionnaire/${survey_id}?token=${token}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

  update(data: any): Observable<Question> {
    const id = data['question_id'];
    if (!id) { return Observable.throw(new BadInputError('Id is not defined.'))} ;
    const url = `${this.url}/${id}`;
    return super.update(data, url);
  }

}
export const QUESTION_PROVIDERS: Array<any> = [
  { provide: QuestionService , useClass: QuestionService }
]
