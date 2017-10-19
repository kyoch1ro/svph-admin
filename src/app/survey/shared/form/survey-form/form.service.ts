import { Duration } from '../../../duration.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SurveyFormService {
  private durationSource: Subject<Duration> = new Subject<Duration>();


  duration$ = this.durationSource.asObservable();

  submitDuration(item: Duration) {
    this.durationSource.next(item);
  }

}



export const SURVEY_FORM_PROVIDER: Array<any> = [
  { provide: SurveyFormService , useClass: SurveyFormService }
]
