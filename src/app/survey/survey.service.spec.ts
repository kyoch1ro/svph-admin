import { SurveyService } from './shared/services/survey.service';
import { TestBed, inject } from '@angular/core/testing';


describe('SurveyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurveyService]
    });
  });

  it('should be created', inject([SurveyService], (service: SurveyService) => {
    expect(service).toBeTruthy();
  }));
});
