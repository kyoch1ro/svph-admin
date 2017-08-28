import { TestBed, inject } from '@angular/core/testing';

import { SurveyTypeService } from './type.service';

describe('TypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurveyTypeService]
    });
  });

  it('should be created', inject([SurveyTypeService], (service: SurveyTypeService) => {
    expect(service).toBeTruthy();
  }));
});
