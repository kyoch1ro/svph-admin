import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSpinnerComponent } from './save-spinner.component';

describe('SaveSpinnerComponent', () => {
  let component: SaveSpinnerComponent;
  let fixture: ComponentFixture<SaveSpinnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveSpinnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
