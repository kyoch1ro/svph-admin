import { Option } from '../../models/option.model';
import { Component, HostBinding, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';





@Component({
  selector: 'sur-que-opt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class OptionFormComponent implements OnInit, IFormComponent {
  @HostBinding('class') cssClass = 'm-bottom-sm d-block';
  @Input() btnLabel= 'Add';
  @Input()
  set option(val: Option){
    this._option.next(new Option(val));
  }
  get option(){
    return this._option.getValue();
  }

  @Input() set isPending(val){
    this._ispending.next(val);
  }

  get isPending(){
    return this._ispending.getValue();
  }
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  private _ispending: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _option: BehaviorSubject<Option> = new BehaviorSubject<Option>(new Option());
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      option_id : [0, Validators.required],
      question_id : [0, Validators.required],
      option_caption : ['', Validators.required],
      option_isactive : ['', Validators.required],
      option_isdeleted : ['', Validators.required]
    })

    this._option.subscribe(data => {
      if (!data) {
        return;
      }

      this.form.patchValue(data);
    })

    this._ispending.subscribe(data => {
      this.toggleControls(data);
    })
  }

  isDirty(): boolean {
    return true;
  }

  onSubmit(data) {
    if (this.form.invalid) {
      return;
    }
    if (!this.option.option_id) {
        this.form.get('option_caption').reset();
    }
    this.formSubmit.emit(data);
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
