import { Component, OnInit, Input, Output, HostBinding } from '@angular/core';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { EventEmitter } from '@angular/core';
import { FormGroup, 
         FormBuilder, 
         Validators, 
         FormControl} from '@angular/forms';
import { IOptionDTO } from 'app/survey/i-survey';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Option } from './../../option.model';
@Component({
  selector: 'sur-que-opt-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit,IFormComponent {
  @HostBinding('class') cssClass = 'm-bottom-sm d-block';
  @Input() btnLabel : string = "Add";
  @Input() 
  set option(val: IOptionDTO){
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
  @Output() formSubmit : EventEmitter<any> = new EventEmitter<any>(); //OUTPUT
  private _ispending : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _option: BehaviorSubject<Option> = new BehaviorSubject<Option>(new Option());
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      option_id : [0,Validators.required],
      question_id : [0,Validators.required],
      option_caption : ['',Validators.required],
      option_isactive : ['',Validators.required],
      option_isdeleted : ['',Validators.required]
    })

    this._option.subscribe(data => {
      if(!data) return;
      this.form.patchValue(data);
    })

    this._ispending.subscribe(data => {
      this.toggleControls(data);
      if(data){
        this.form.get('option_caption').reset();
      }
      
    })
  }

  isDirty(): boolean{
    return true;
  }
  onSubmit(data){
    if(this.form.invalid) return;
    this.formSubmit.emit(data);
  }
  toggleControls(data: boolean){
    if(data){
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).disable();
      });
    }else{
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).enable();
      });
    }
  }
}
