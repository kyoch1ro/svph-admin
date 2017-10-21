import { Question } from '../shared/models/question.model';
import { QuestionService } from './question.service';
import { SurveyQuestion } from '../shared/models/survey.model';
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

  constructor(http: Http, private _questionSrvc: QuestionService) {
    super(http, `${apiUrl}/survey`);
  }

  getSurveyWithQuestions(id: number): Observable<SurveyQuestion> {
    return Observable.forkJoin([
      this.getById(id),
      this._questionSrvc.listBySurveyId(id)
    ]).map(data => {
      const survey: SurveyQuestion = data[0].survey;
      let questions: Question[] = [];
      const items: Question[] = data[1].questionnaire;

      questions = items.filter(item => +item.question_parent === 0)
                  .reduce((prev: Question[], curr: Question) => {
                    curr.survey_id = survey.id;
                    curr.options = curr.options.map(opt => Object.assign({}, opt, { question_id: curr.question_id}))
                    curr.childrens = [];
                    return [...prev, curr];
                  }, []);
      items.filter(item => +item.question_parent > 0)
        .map(child => {
          const parent_indx = questions.findIndex(parent => parent.question_id === +child.question_parent);
          child = Object.assign({}, child, {
            survey_id: survey.id,
            options: child.options.map(opt => Object.assign({}, opt, { question_id: child.question_id}))
          })
          questions[parent_indx].childrens.push(child);
        })
      survey.questions = questions;
      return survey;
    })
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
