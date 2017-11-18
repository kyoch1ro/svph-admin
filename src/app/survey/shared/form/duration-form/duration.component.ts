import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Duration } from '../../models/duration.model';
import { SurveyFormService } from '../survey-form/form.service';


// MAKE THIS DUMB COMPONENT REMOVED THE SURVEYFORM SERVICE

@Component({
  selector: 'app-survey-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss']
})
export class DurationFormComponent implements OnInit, IFormComponent {
  @Input() set duration(val: Duration){
    this._duration.next(val);
  }
  @Input() btnLabel = 'Submit';
  @Input() set isPending(val){
    this._ispending.next(val);
  }

  form: FormGroup;

  private initialValue: Duration = {
    id: 0,
    survey_id: 0,
    start_date: '',
    end_date: '',
    reward_point: 0
  }

  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  private _duration: BehaviorSubject<Duration> = new BehaviorSubject<Duration>(this.initialValue);
  private _ispending = new BehaviorSubject<boolean>(false);

  constructor(private fb: FormBuilder,
              private _surveyFormSrvc: SurveyFormService) { }

  ngOnInit() {
    this._initializeForm();
    this._duration.subscribe((newDuration: Duration) => {
      this.form.patchValue(newDuration);
    })
  }

  onSubmit(data: Duration) {
    this._surveyFormSrvc.submitDuration(data);
  }


  get duration(): Duration{
    return this._duration.getValue();
  }

  get isPending(){
    return this._ispending.getValue();
  }

  isDirty(): boolean {
    return true;
  }

  private _initializeForm() {
    this.form = this.fb.group({
        id: ['', Validators.required ],
        survey_id: ['', Validators.required ],
        start_date: ['', Validators.required ],
        end_date: ['', Validators.required ],
        reward_point: ['', Validators.required ]
    })

  }

  toggleControls(data: boolean) {
    if (data) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).disable();
      });
    }else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).enable();
      });
    }
  }

}

