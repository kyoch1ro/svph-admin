import { Injectable } from '@angular/core';
import { ISurveyDuration } from 'app/survey/shared/survey.interface';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SurveyFormService {
  private durationSource: Subject<ISurveyDuration> = new Subject<ISurveyDuration>();


  duration$ = this.durationSource.asObservable();

  submitDuration(item: ISurveyDuration) {
    this.durationSource.next(item);
  }

}



export const SURVEY_FORM_PROVIDER: Array<any> = [
  { provide: SurveyFormService , useClass: SurveyFormService }
]
