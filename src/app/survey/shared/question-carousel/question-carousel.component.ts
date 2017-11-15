import { ActivatedRoute } from '@angular/router';
import { Option } from '../models/option.model';
import { QuestionTypes } from '../../../core/consts/question-type.const';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Question, QuestionOptionChildren } from '../models/question.model';

export enum OutType {
  option = 0,
  question = 1
}

export interface CarouselOutput {
  resource: any,
  type: OutType
}


@Component({
  selector: 'survey-question-carousel',
  templateUrl: './question-carousel.component.html',
  styleUrls: ['./question-carousel.component.scss']
})
export class QuestionCarouselComponent implements OnInit, OnDestroy {
  @Input() questions: QuestionOptionChildren[];
  @Output() formSubmitted = new EventEmitter<CarouselOutput>();
  private _activeIndx = new BehaviorSubject<number>(0);
  surveyId: number;
  modalForm: AvailableForms;
  formTemplate: any;
  modalInstance: NgbModalRef;



  constructor(private modalService: NgbModal,
              private _router: ActivatedRoute) { }

  ngOnInit() {
    this._router.paramMap.subscribe(params => {
      this.surveyId = +params.get('id');
    })
  }

  addParentQuestion(content) {
    this.modalForm = AvailableForms.questionForm;
    this.formTemplate = new Question({ survey_id: this.surveyId });
    this.openModal(content);
  }

  addSubQuestion(content) {
    this.modalForm = AvailableForms.questionForm;
    this.formTemplate = new Question({ survey_id: this.activeQuestion.survey_id, question_parent: this.activeQuestion.question_id });
    this.openModal(content);
  }
  addOption(content, parentId?: number) {
    this.modalForm = AvailableForms.optionForm;
    const id = (parentId) ? parentId : this.activeQuestion.question_id;
    this.formTemplate = new Option({ question_id: id});
    this.openModal(content);
  }


  hasOptions(item: Question) {
    return !(item.option_type === 'enums' || this.activeQuestion.option_type === 'text');
  }
  private openModal(content) {
    this.modalInstance = this.modalService.open(content);
  }


  updateActiveIndex(indx: number) {
    this._activeIndx.next(indx);
  }


  get activeQuestion() {
    return this.questions[this.activeIndx];
  }


  get activeIndx() {
    return this._activeIndx.getValue();
  }

  saveQuestion(data: Question) {
    if (this.modalInstance) this.modalInstance.close();
    this.formSubmitted.emit({
      type: OutType.question,
      resource: data
    })
  }

  saveOption(data: Option) {
    if (this.modalInstance) this.modalInstance.close();
    this.formSubmitted.emit({
      type: OutType.option,
      resource: data
    })
  }

  ngOnDestroy() {
    if (this.modalInstance) this.modalInstance.close();
  }

}


export enum AvailableForms {
  questionForm,
  optionForm
}


