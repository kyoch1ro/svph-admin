import { Component, OnInit, Input } from '@angular/core';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { EventEmitter } from '@angular/core';
import { Survey } from './../../survey.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormGroup, 
         FormBuilder, 
         Validators, 
         FormControl} from '@angular/forms';

@Component({
  selector: 'sur-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, IFormComponent  {
  @Input() set survey(val: Survey){
    this._survey.next(val);
  };

  get survey(){ return this._survey.getValue(); }
  private _survey = new BehaviorSubject<Survey>(new Survey())
  formSubmit : EventEmitter<any> = new EventEmitter<any>(); //OUTPUT
  isPending : boolean;
  form: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      survey_type_id: [ this.survey.survey_type_id, Validators.required ],
      survey_title: [ this.survey.survey_title, Validators.required ],
      survey_isfeatured: [ this.survey.survey_isfeatured, Validators.required ],
      start_date: [ this.survey.start_date, Validators.required ],
      end_date: [ this.survey.end_date, Validators.required ]
    })
  }


  isDirty(): boolean{
    return true;
  };

  onSubmit(data: any){
    console.log(data)
  }
}
