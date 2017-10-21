import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionCarouselComponent } from './question-carousel.component';

describe('QuestionCarouselComponent', () => {
  let component: QuestionCarouselComponent;
  let fixture: ComponentFixture<QuestionCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
