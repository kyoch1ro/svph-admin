import { CarouselOutput, OutType } from '../shared/question-carousel/question-carousel.component';
import { Option } from '../shared/models/option.model';
import {
    MainNotificationService,
    NotificationType,
    SavingNotification,
} from '../../core/services/main-notification.service';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ISubscription } from 'rxjs/Subscription';

import { IAlert } from '../../core/contracts/i-alert';
import { ISurveyDurationService } from '../../core/contracts/i-http-services';
import { DurationService } from '../services/duration.service';
import { OptionService } from '../services/option.service';
import { QuestionService } from '../services/question.service';
import { SurveyService } from '../services/survey.service';
import { SurveyFormComponent } from '../shared/form/survey-form/form.component';
import { SURVEY_FORM_PROVIDER, SurveyFormService } from '../shared/form/survey-form/form.service';
import { Duration } from '../shared/models/duration.model';
import { Question } from '../shared/models/question.model';
import { Survey, SurveyQuestion } from '../shared/models/survey.model';

@Component({
  selector: 'sur-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [ SURVEY_FORM_PROVIDER ]
})
export class ViewComponent implements OnInit, OnDestroy {
  @ViewChild(SurveyFormComponent) surveyForm: SurveyFormComponent;
  survey: SurveyQuestion;
  id_param_subscription: ISubscription;
  activeTab = 'questions';



  isOptionPending = [];
  isQuestionPending = [];

  isAddQuestionPending: boolean;
  isAddOptionPending = [];
  isUpdateOptionPending = [];
  isUpdateQuestionPending = [];
  alert: IAlert;
  modalReference: any;
  duration$: ISubscription;
// update the DurationService DI
  constructor(private _surveySrvc: SurveyService,
              private _questionSrvc: QuestionService,
              private _optionSrvc: OptionService,
              @Inject(DurationService) private _durSrvc: ISurveyDurationService<Duration>,
              private _surveyFormSrvc: SurveyFormService,
              private _route: ActivatedRoute,
              private modalService: NgbModal,
              private notification: MainNotificationService) {  }

  ngOnInit() {
    // this.questionsHolder.select('2');
      this.setSurvey();
      this.duration$ = this._surveyFormSrvc.duration$.subscribe(data => {
        if (+data.id === 0) {
          this._addDuration(data);
        }else {
          this._updateDuration(data);
        }
      });
  }


  //#region SETTERS
  private setSurvey() {
    this.id_param_subscription =
      this._route.params.switchMap((params: Params) => this._surveySrvc.getSurveyWithQuestions(+params['id'])).subscribe(
        data => this.survey = new SurveyQuestion(data)
    );
  }
  //#endregion

  private _updateDuration(data: Duration) {
    const updatedItem = Object.assign({}, data, { survey_id: this.survey.id });
    this._durSrvc.update(updatedItem).take(1).subscribe(res => console.log(res));
  }

  private _addDuration(data: Duration) {
    const updatedItem = Object.assign({}, data, { survey_id: this.survey.id});
    this._durSrvc.add(updatedItem).take(1).subscribe(res => console.log(res))
  }

  save(event: CarouselOutput) {
    this.notification.create(SavingNotification);
    switch (event.type) {
      case OutType.option:
        this.saveOption(event.resource);
        break;
      case OutType.question:
        this.saveQuestion(event.resource);
        break;
      default:
        console.log('Error')
    }
  }

  private saveQuestion(data: any) {
    this._questionSrvc
        .save(data)
        .subscribe(x => {
          this.notification.create();
          this.survey.saveQuestion(data);
        })
  }

  private saveOption(data: Option) {
    this._optionSrvc
        .save(data)
        .subscribe(x => {
          const isNew = data.option_id === 0;
          this.notification.create();
          data.option_id = +(x['option'] as Option).option_id;
          this.survey.saveOption(data, isNew);
        })
    // console.log(data);
    // return (data.option_id > 0 ) ? this.updateOption(data) : this.addOption(data);
  }

  //#region HELPERS
  // private updateQuestion(resource: Question) {
    
  //   this._questionSrvc
  //     .update(resource)
  //     .take(1)
  //     .subscribe(data => {
  //       this.notification.create();
        
  //     }
  //     )
  // }

  // private addQuestion(resource: Question) {
  //   this.notification.create(SavingNotification);
  //   this._questionSrvc
  //       .create(resource)
  //       .take(1)
  //       .subscribe(data => {
  //         this.notification.create();
  //         resource.question_id = data['question']['question_id'];
  //         this.survey.addQuestion(resource);
  //       })
  // }




  // private updateOption(resource: Option) {
  //   this.notification.create(SavingNotification);
  //   this._optionSrvc
  //       .update(resource)
  //       .take(1)
  //       .subscribe(data => {
  //         this.notification.create();
  //         this.survey.updateOption(resource);
  //         console.log(data);
  //       });
  // }

  // private addOption(resource: Option) {
  //   this.notification.create(SavingNotification);
  //   this._optionSrvc
  //       .create(resource)
  //       .take(1)
  //       .subscribe(data => console.log(data));
  // }

  //#endregion



  // updateQuestion(event: Question) {
  //   this.isQuestionPending[event.question_id] = true;
  //   const update_que_sub: ISubscription =
  //     this._questionSrvc.update(event).subscribe(
  //       data => {},
  //       err => {
  //         this.isQuestionPending[event.question_id] = false;
  //         console.log(err);
  //       },
  //       () => {
  //         this.isQuestionPending[event.question_id] = false;
  //         update_que_sub.unsubscribe();
  //       }
  //     )
  // }

  // addQuestion(event) {
  //   this.isQuestionPending[0] = true;
  //   event['survey_id'] = this.survey.id;
  //   const add_que: ISubscription = this._questionSrvc.create(event).subscribe(
  //     data => {
  //       if (data['question'].option_type === 'enums' || data['question'].option_type === 'text') {
  //         this._addDefaultOption(data['question'].question_id);
  //       }
  //       data.childrens = [];
  //       this.survey.questions.push(data.question);
  //     },
  //     err => {
  //       this.isQuestionPending[0] = false;
  //     },
  //     () => {
  //       this.modalReference.close();
  //       this.isQuestionPending[0] = false;
  //       add_que.unsubscribe();
  //     }
  //   );
  // }


  private _addDefaultOption(question_id: number) {
    const defaultOption: Option = {
      created_at: '',
      option_caption: 'N/A',
      option_id: 0,
      option_isactive: 0,
      option_isdeleted: 0,
      question_id: question_id,
      updated_at : ''
    }
    this._optionSrvc.create(defaultOption).take(1).subscribe(
      data => { },
      err => {
        },
      () => {
      }
    )
  }
  updateSurvey(event) {
    this.notification.create(SavingNotification);
    this._surveySrvc
        .update(event)
        .take(1)
        .subscribe(
          data => {
            this.notification.create();
            this.survey = new SurveyQuestion(Object.assign({}, this.survey, event))
          }
        );
  }

  addSubQuestion(index, event) {
    this.isQuestionPending[0] = true;
    const add_sub: ISubscription =  this._questionSrvc.create(event).subscribe(
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
    this.id_param_subscription.unsubscribe();
  }

}
