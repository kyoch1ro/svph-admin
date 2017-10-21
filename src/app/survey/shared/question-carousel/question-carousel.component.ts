import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';

import { Question, QuestionOptionChildren } from '../models/question.model';


@Component({
  selector: 'survey-question-carousel',
  templateUrl: './question-carousel.component.html',
  styleUrls: ['./question-carousel.component.scss']
})
export class QuestionCarouselComponent implements OnInit {
  @Input() questions: QuestionOptionChildren[];
  @Output() questionFormSubmitted = new EventEmitter<Question>();
  private _activeIndx = new BehaviorSubject<number>(0);
  constructor() { }

  ngOnInit() {
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
    this.questionFormSubmitted.emit(data);
  }

}
