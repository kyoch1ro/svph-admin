import { markControlsAsTouched } from '../../../core/helpers/form-helper';
import { ISubscription } from 'rxjs/Subscription';
import { Question } from '../models/question.model';
import { QuestionTypes } from '../../../core/consts/question-type.const';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'survey-question-form',
  templateUrl: './q-form.component.html',
  styleUrls: ['./q-form.component.scss']
})
export class QuestionFormComponent implements OnInit, OnDestroy {
  @Input() set formValue(val: any) {
    this._question.next(new Question(val));
  }
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;
  questionTypes = QuestionTypes;
  formValueSubscription: ISubscription;

  private _question: BehaviorSubject<Question> = new BehaviorSubject<Question>(new Question());
  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.setForm();
    this.formValueSubscription = this._question.subscribe(data => {
      this.form.patchValue(data);
    });
  }


  formStatusReset() {
    console.log('yeah');
    this.form.reset(this.form.value);
  }

  onSubmit() {
    markControlsAsTouched(this.form);
    if (this.form.invalid) return;
    this.form.markAsPending();
    this.formSubmit.emit(this.form.value);
  }
  //#region SETTERS
  private setForm() {
    this.form = this.fb.group({
      question_id: [0, Validators.required],
      survey_id: [0, Validators.required],
      question_parent: [0, Validators.required],
      question_caption: ['', Validators.required],
      option_type: ['', Validators.required],
      question_isdeleted: ['', Validators.required]
    })
  }
  //#endregion

  ngOnDestroy() {
    this.formValueSubscription.unsubscribe();
  }
}
