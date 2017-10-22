import { Option } from '../models/option.model';
import { QuestionTypes } from '../../../core/consts/question-type.const';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal.module';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Question, QuestionOptionChildren } from '../models/question.model';


@Component({
  selector: 'survey-question-carousel',
  templateUrl: './question-carousel.component.html',
  styleUrls: ['./question-carousel.component.scss']
})
export class QuestionCarouselComponent implements OnInit, OnDestroy {
  @Input() questions: QuestionOptionChildren[];
  @Output() questionFormSubmitted = new EventEmitter<Question>();
  @Output() optionFormSubmitted = new EventEmitter<Option>();
  private _activeIndx = new BehaviorSubject<number>(0);
  modalForm: AvailableForms;
  formTemplate: any;
  modalInstance: NgbModalRef;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  addParentQuestion(content) {
    this.modalForm = AvailableForms.questionForm;
    this.formTemplate = { survey_id: this.activeQuestion.survey_id };
    this.openModal(content);
  }



  get hasOptions() {
    return !(this.activeQuestion.option_type === 'enums' || this.activeQuestion.option_type === 'text');
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
    this.questionFormSubmitted.emit(data);
  }

  saveOption(data: Option) {
    if (this.modalInstance) this.modalInstance.close();
    this.optionFormSubmitted.emit(data);
  }

  ngOnDestroy() {
    if (this.modalInstance) this.modalInstance.close();
  }

}


export enum AvailableForms {
  questionForm,
  optionForm
}


