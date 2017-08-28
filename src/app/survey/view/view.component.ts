import { DurationService } from '../shared/services/duration.service';
import { SurveyService } from '../shared/services/survey.service';
import { SURVEY_FORM_PROVIDER, SurveyFormService } from '../shared/form/form.service';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMap';

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

import { IAlert } from '../../core/contracts/i-alert';
import {
    IOptionService,
    IQuestionService,
    ISurveyDurationService,
    ISurveyService,
} from '../../core/contracts/i-http-services';
import { OptionService } from '../question/option/option.service';
import { QuestionService } from '../question/question.service';
import { IOption, IQuestion, IQuestionOption, ISurveyDuration, ISurveyQuestion } from '../shared/survey.interface';
import { Survey } from '../survey.model';




@Component({
  selector: 'sur-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [ SURVEY_FORM_PROVIDER ]
})
export class ViewComponent implements OnInit, OnDestroy {
  survey: Survey;
  isPending: boolean;

  isOptionPending = [];
  isQuestionPending = [];

  isAddQuestionPending: boolean;
  isAddOptionPending = [];
  isUpdateOptionPending = [];
  isUpdateQuestionPending = [];
  alert: IAlert;
  modalReference: any;

  duration$: ISubscription;

  constructor(@Inject(SurveyService) private _surveySrvc: ISurveyService,
              @Inject(QuestionService) private _questionSrvc: IQuestionService,
              @Inject(OptionService) private _optionSrvc: IOptionService,
              @Inject(DurationService) private _durSrvc: ISurveyDurationService<ISurveyDuration>,
              private _surveyFormSrvc: SurveyFormService,
              private _route: ActivatedRoute,

              private modalService: NgbModal) { }
  ngOnInit() {
    const id_param_subscription =
      this._route.params.switchMap((params: Params) =>
      Observable.forkJoin([
        this._surveySrvc.getById(params['id']),
        this._questionSrvc.list(params['id'])
      ])).map((data: any) => {
        const survey: ISurveyQuestion = data[0].survey;
        let questions: IQuestionOption[] = [];
        const items: IQuestionOption[] = data[1].questionnaire;

        questions = items.filter(item => +item.question_parent === 0)
                    .reduce((prev: IQuestionOption[], curr: IQuestionOption) => {
                      curr.survey_id = survey.id;
                      curr.options = curr.options.map(opt => Object.assign({}, opt, { question_id: curr.question_id}))
                      curr.childrens = [];
                      return [...prev, curr];
                    }, []);
        items.filter(item => +item.question_parent > 0)
        .map(child => {
          const parent_indx = questions.findIndex(parent => parent.question_id === +child.question_parent);
          child = Object.assign({}, child, {
            survey_id: survey.id,
            options: child.options.map(opt => Object.assign({}, opt, { question_id: child.question_id}))
          })
          questions[parent_indx].childrens.push(child);
        })
        survey.questions = questions;
        return survey;
      })
      .subscribe(
        data => {
          this.survey = new Survey(data);
        },
        err => {},
        () => {
          id_param_subscription.unsubscribe();
        }
      );



      this.duration$ = this._surveyFormSrvc.duration$.subscribe(data => {
        if (+data.id === 0) {
          this._addDuration(data);
        }else {
          this._updateDuration(data);
        }
      });
  }



  private _updateDuration(data: ISurveyDuration) {
    const updatedItem = Object.assign({}, data, { survey_id: this.survey.id});
    this._durSrvc.update(updatedItem).take(1).subscribe(res => console.log(res));
  }

  private _addDuration(data: ISurveyDuration){
    const updatedItem = Object.assign({}, data, { survey_id: this.survey.id});
    this._durSrvc.add(updatedItem).take(1).subscribe(res => console.log(res))
  }

  open(content) {
    this.modalReference = this.modalService.open(content,{
      size: 'lg'
    });
  }

  updateQuestion(event: IQuestion) {
    this.isQuestionPending[event.question_id] = true;
    const update_que_sub: ISubscription =
      this._questionSrvc.update(event).subscribe(
        data => {},
        err => {
          this.isQuestionPending[event.question_id] = false;
          console.log(err);
        },
        () => {
          this.isQuestionPending[event.question_id] = false;
          update_que_sub.unsubscribe();
        }
      )
  }

  addQuestion(event){
    this.isQuestionPending[0] = true;
    event['survey_id'] = this.survey.id;
    const add_que: ISubscription = this._questionSrvc.add(event).subscribe(
      data => {
        if (data['question'].option_type === 'enums' || data['question'].option_type === 'text') {
          this._addDefaultOption(data['question'].question_id);
        }
        data.childrens = [];
        this.survey.questions.push(data.question);
      },
      err => {
        this.isQuestionPending[0] = false;
      },
      () => {
        this.modalReference.close();
        this.isQuestionPending[0] = false;
        add_que.unsubscribe();
      }
    );
  }


  private _addDefaultOption(question_id: number){
    const defaultOption: IOption = {
      created_at: '',
      option_caption: 'N/A',
      option_id: 0,
      option_isactive: 0,
      option_isdeleted: 0,
      question_id: question_id,
      updated_at : ''
    }
    this._optionSrvc.add(defaultOption).take(1).subscribe(
      data => { },
      err => {
        },
      () => {
      }
    )
  }
  updateSurvey(event) {
    this.isPending = true;
    const upd_sur: ISubscription = this._surveySrvc.update(event).subscribe(
      data => {},
      err => {
        this.isPending = false;
        console.log(err)
      },
      () => {
        this.isPending = false;
        upd_sur.unsubscribe();
      }
      );
  }

  addSubQuestion(index, event) {
    this.isQuestionPending[0] = true;
    const add_sub: ISubscription =  this._questionSrvc.add(event).subscribe(
      data => {
        this.survey.questions[index].childrens.push(data)
      },
      err => {
        this.isQuestionPending[0] = false;
      },
      () => {
        this.isQuestionPending[0] = false;
        add_sub.unsubscribe()
      }
    )
  }


  ngOnDestroy() {
    this.duration$.unsubscribe();
  }

}
