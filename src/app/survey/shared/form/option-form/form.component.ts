import { markControlsAsTouched } from '../../../../core/helpers/form-helper';
import { ISubscription } from 'rxjs/Subscription';
import { Option } from '../../models/option.model';
import { Component, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'option-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class OptionFormComponent implements OnInit, IFormComponent, OnDestroy {
  //#region INPUTS
  @Input() btnLabel= 'Save';
  @Input() set formValue(val: any){
    this._option.next(new Option(val));
  }
  //#endregion
  //#region OUTPUTS
  @Output() formSubmit: EventEmitter<Option> = new EventEmitter<Option>();
  //#endregion
  form: FormGroup;
  formValueSubscription: ISubscription;

  private _option: BehaviorSubject<Option> = new BehaviorSubject<Option>(new Option());
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.setForm();
    this.formValueSubscription = this._option.subscribe(data => this.form.patchValue(data));

  }

  onSubmit() {
    markControlsAsTouched(this.form);
    if (this.form.invalid) return;
    // this.form.markAsPending();
    this.formSubmit.emit(this.form.value);
  }

  isDirty(): boolean {
    return true;
  }

  private setForm() {
    this.form = this.fb.group({
      option_id : [0, Validators.required],
      question_id : [0, Validators.required],
      option_caption : ['', Validators.required],
      option_isactive : ['', Validators.required],
      option_isdeleted : ['', Validators.required]
    })
  }

  ngOnDestroy() {
    this.formValueSubscription.unsubscribe();
  }

}
