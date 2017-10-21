import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionFormComponent } from './q-form.component';

describe('QFormComponent', () => {
  let component: QuestionFormComponent;
  let fixture: ComponentFixture<QuestionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
