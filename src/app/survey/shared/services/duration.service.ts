import { Injectable } from '@angular/core';

@Injectable()
export class DurationService {

  constructor() { }

}



export const SURVEY_DURATION_PROVIDERS: Array<any> = [
  { provide: DurationService ,useClass: DurationService }
]


