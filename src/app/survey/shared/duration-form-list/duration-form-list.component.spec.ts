import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DurationFormListComponent } from './duration-form-list.component';

describe('DurationFormListComponent', () => {
  let component: DurationFormListComponent;
  let fixture: ComponentFixture<DurationFormListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationFormListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationFormListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
