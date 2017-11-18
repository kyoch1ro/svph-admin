import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISubscription } from 'rxjs/Subscription';

import { markControlsAsTouched } from '../../../../core/helpers/form-helper';
import { Duration } from '../../models/duration.model';

@Component({
  selector: 'sur-duration-form',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss']
})
export class DurationFormComponent implements OnInit, OnDestroy {
  @Input() btnLabel = 'Save';
  @Input() set formValue(val: Duration){
    this._duration.next(val);
  }
  @Output() formSubmit: EventEmitter<Duration> = new EventEmitter<Duration>();
  form: FormGroup;
  formValueSubscription: ISubscription;
  private _duration: BehaviorSubject<Duration> = new BehaviorSubject<Duration>(new Duration());
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.setForm();
    this.formValueSubscription = this._duration.subscribe((data: Duration) => {
      if (data.end_date) {
        const end_time = new Date(data.end_date);
        const time_now = new Date;
        if (end_time < time_now) this.form.disable();
      }
      this.form.patchValue(data);
    });
  }


  onSubmit() {
    markControlsAsTouched(this.form);
    if (this.form.invalid) return;
    this.form.markAsPending();
    this.formSubmit.emit(this.form.value);
  }

  private setForm() {
    this.form = this.fb.group({
        id: [0, Validators.required ],
        survey_id: [0, Validators.required ],
        start_date: ['', Validators.required ],
        end_date: ['', Validators.required ],
        reward_point: [0, Validators.required ]
    })
  }

  ngOnDestroy() {
    this.formValueSubscription.unsubscribe();
  }

}

