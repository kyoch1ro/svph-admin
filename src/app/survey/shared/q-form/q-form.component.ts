import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionOptionChildren } from '../models/question.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'survey-question-form',
  templateUrl: './q-form.component.html',
  styleUrls: ['./q-form.component.scss']
})
export class QuestionFormComponent implements OnInit {
  @Input() set formValue(val: QuestionOptionChildren) {
    this._question.next(new QuestionOptionChildren(val));
  }
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  form: FormGroup;


  private _question: BehaviorSubject<QuestionOptionChildren> = new BehaviorSubject<QuestionOptionChildren>(new QuestionOptionChildren());
  constructor(private fb: FormBuilder) { }


  ngOnInit() {
    this.setForm();
    this._question.filter(x => x.question_id > 0 ).subscribe(data => this.form.patchValue(data));
  }


  formStatusReset() {
    this.form.reset(this.form.value);
  }

  onSubmit() {
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
}
