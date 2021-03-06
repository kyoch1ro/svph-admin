import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ISubscription } from 'rxjs/Subscription';

import { OptionService } from '../../../services/option.service';
import { Option } from '../../models/option.model';
import { QuestionOptionChildren } from '../../models/question.model';







@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sur-que-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit, IFormComponent {
  @Input() btnLabel = 'Add';
  @Input() set question(val: QuestionOptionChildren){
    this._question.next(new QuestionOptionChildren(val));
  }
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Output() newSubQuestion: EventEmitter<any> = new EventEmitter<any>();
  @Input() set isPending(val){
    this._ispending.next(val);
  }

  get isPending(){
    return this._ispending.getValue();
  }
  form: FormGroup;
  private _ispending: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _question: BehaviorSubject<QuestionOptionChildren> = new BehaviorSubject<QuestionOptionChildren>(new QuestionOptionChildren());
  question_with_parent_id: QuestionOptionChildren;

  modalReference: any;
  public isoptionpending = [];
  constructor(private fb: FormBuilder,
              private _optionSrvc: OptionService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.form = this.fb.group({
      question_id: [0, Validators.required],
      question_parent: [0, Validators.required],
      survey_id: [0, Validators.required],
      question_caption: ['', Validators.required],
      option_type: ['', Validators.required],
      question_isdeleted: ['', Validators.required]
    })

    this._question.subscribe((data: QuestionOptionChildren ) => {
      if (!data) {
        return;
      }
      this.form.patchValue(data);
    })

    this._ispending.subscribe(data => {
      this.toggleControls(data)
    });
  }

  isDirty(): boolean {
    return true;
  }

  get question(){
    return this._question.getValue();
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

  onSubmit(form: any) {
    if (this.form.invalid) {
      return;
    }
    this.formSubmit.emit(form);
  }

  open(content) {
    this.modalReference = this.modalService.open(content, {
      size: 'lg'
    });
  }


  addOption(event: Option) {
    this.isoptionpending[0] = true;
    event.question_id = this.question.question_id;
    const add_opt: ISubscription =
      this._optionSrvc.create(event).subscribe(
        data => { this.question.options.push(data['option']); },
        err => {
          this.isoptionpending[0] = false;
         },
        () => {
          this.isoptionpending[0] = false;
          add_opt.unsubscribe();
        }
      )
  }

  updateOption(event: Option) {
    this.isoptionpending[event.option_id] = true;
    const update_opt: ISubscription =
      this._optionSrvc.update(event).subscribe(
        data => { },
        err => {
          this.isoptionpending[event.option_id] = false;
        },
        () => {
          this.isoptionpending[event.option_id] = false;
          update_opt.unsubscribe();
        }
      )
  }


  addSubQuestion(event: QuestionOptionChildren) {
    event.question_parent = this.question.question_id;
    event.survey_id = this.question.survey_id;
    this.newSubQuestion.emit(event);
  }
}
