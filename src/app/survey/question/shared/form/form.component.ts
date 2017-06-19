import { Component, OnInit, Input, Output } from '@angular/core';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { EventEmitter } from '@angular/core';
import { FormGroup, 
         FormBuilder, 
         Validators, 
         FormControl} from '@angular/forms';
import { IQuestionDTO } from 'app/survey/i-survey';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Question } from './../../question.model';
@Component({
  selector: 'sur-que-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, IFormComponent {
  @Input() btnLabel : string = "Add";
  @Input() 
  set question(val: IQuestionDTO){
    this._question.next(new Question(val));
  }
  get question(){
    return this._question.getValue();
  }
  
  @Output() formSubmit : EventEmitter<any> = new EventEmitter<any>(); //OUTPUT
  @Input() set isPending(val){
    this._ispending.next(val);
  }

  get isPending(){
    return this._ispending.getValue();
  }
  form: FormGroup;
  private _ispending : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _question : BehaviorSubject<Question> = new BehaviorSubject<Question>(new Question());

  constructor(private fb: FormBuilder) { }
  
  ngOnInit() {
    this.form = this.fb.group({
      question_id: [0,Validators.required],
      survey_id: [0,Validators.required],
      question_caption: ['',Validators.required],
      option_type: ['',Validators.required]
    })



    this._question.subscribe(data => {
      if(!data) return;
      this.form.patchValue(data);
    })
  }

  isDirty(): boolean{
    return true;
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

  onSubmit(form: any){
    if(this.form.invalid) return;
    this.formSubmit.emit(form);

  }
}
