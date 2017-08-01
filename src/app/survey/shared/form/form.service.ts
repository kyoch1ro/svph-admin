import { Injectable } from '@angular/core';

@Injectable()
export class SurveyFormService {

  constructor() { }

}



export const SURVEY_FORM_PROVIDER: Array<any> = [
  { provide: SurveyFormService , useClass: SurveyFormService }
]
