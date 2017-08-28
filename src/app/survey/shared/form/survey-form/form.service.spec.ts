import { TestBed, inject } from '@angular/core/testing';

import { SurveyFormService } from './form.service';

describe('FormService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurveyFormService]
    });
  });

  it('should be created', inject([SurveyFormService], (service: SurveyFormService) => {
    expect(service).toBeTruthy();
  }));
});
