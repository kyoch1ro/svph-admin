import { TestBed, inject } from '@angular/core/testing';

import { DurationService } from './duration.service';

describe('DurationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DurationService]
    });
  });

  it('should be created', inject([DurationService], (service: DurationService) => {
    expect(service).toBeTruthy();
  }));
});
