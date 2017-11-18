import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationFormComponent } from './duration.component';

describe('DurationComponent', () => {
  let component: DurationFormComponent;
  let fixture: ComponentFixture<DurationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
