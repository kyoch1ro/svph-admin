import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISurveyDuration } from './../../survey.interface';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SurveyFormService } from 'app/survey/shared/form/form.service';
@Component({
  selector: 'app-survey-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss']
})
export class DurationComponent implements OnInit, IFormComponent {
  @Input() set duration(val: ISurveyDuration){
    this._duration.next(val);
  }
  @Input() btnLabel = 'Submit';
  @Input() set isPending(val){
    this._ispending.next(val);
  }

  form: FormGroup;

  private initialValue: ISurveyDuration = {
    id: 0,
    survey_id: 0,
    start_date: '',
    end_date: '',
    reward_point: 0
  }

  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();

  private _duration: BehaviorSubject<ISurveyDuration> = new BehaviorSubject<ISurveyDuration>(this.initialValue);
  private _ispending = new BehaviorSubject<boolean>(false);

  constructor(private fb: FormBuilder,
              private _surveyFormSrvc: SurveyFormService) { }

  ngOnInit() {
    this._initializeForm();
    this._duration.subscribe((newDuration: ISurveyDuration) => {
      this.form.patchValue(newDuration);
    })
  }

  onSubmit(data: ISurveyDuration) {
    this._surveyFormSrvc.submitDuration(data);
  }


  get duration(): ISurveyDuration{
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

