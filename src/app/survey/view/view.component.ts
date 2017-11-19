import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import {
    MainNotificationService,
    NotificationType,
    SavingNotification,
} from '../../core/services/main-notification.service';
import { DurationService } from '../services/duration.service';
import { OptionService } from '../services/option.service';
import { QuestionService } from '../services/question.service';
import { SurveyService } from '../services/survey.service';
import { SurveyFormComponent } from '../shared/form/survey-form/form.component';
import { SURVEY_FORM_PROVIDER } from '../shared/form/survey-form/form.service';
import { Duration } from '../shared/models/duration.model';
import { Option } from '../shared/models/option.model';
import { Question } from '../shared/models/question.model';
import { Survey, SurveyQuestion } from '../shared/models/survey.model';
import { CarouselOutput, OutType } from '../shared/question-carousel/question-carousel.component';

@Component({
  selector: 'sur-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  providers: [ SURVEY_FORM_PROVIDER ]
})
export class ViewComponent implements OnInit, OnDestroy {
  @ViewChild(SurveyFormComponent) surveyForm: SurveyFormComponent;
  @ViewChild('content') private content;
  survey: SurveyQuestion;
  id_param_subscription: ISubscription;
  activeTab = 'survey';
  modalInstance: any;

  constructor(private _surveySrvc: SurveyService,
              private _questionSrvc: QuestionService,
              private _optionSrvc: OptionService,
              private _durSrvc: DurationService,
              private _route: ActivatedRoute,
              private modalService: NgbModal,
              private notification: MainNotificationService) {  }

  ngOnInit() {
      this.setSurvey();
  }


  //#region SETTERS
  private setSurvey() {
    this.id_param_subscription =
      this._route.params.switchMap((params: Params) => this._surveySrvc.getSurveyWithQuestions(+params['id'])).subscribe(
        data => this.survey = new SurveyQuestion(data)
    );
  }
  //#endregion
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

  private saveDuration(data: Duration) {
    this.notification.create(SavingNotification);
    this._durSrvc.save(data)
                 .take(1)
                 .subscribe(x => {
                   const res = x['survey_duration'];
                   this.notification.create();
                   const isNew = data.id === 0;
                   data.id = (res as Duration).id;
                   this.survey.saveDuration(data, isNew);
                 });

  }

  private saveQuestion(data: Question) {
    this._questionSrvc
        .save(data)
        .take(1)
        .subscribe(x => {
          this.notification.create();
          const isNew = data.question_id === 0;
          if (isNew && (x['question'].option_type === 'enums' || x['question'].option_type === 'text')) {
            this._addDefaultOption(x['question'].question_id);
          }
          data.question_id = (x['question'] as Question).question_id;
          this.survey.saveQuestion(data, isNew);
        })
  }

  private saveOption(data: Option) {
    this._optionSrvc
        .save(data)
        .take(1)
        .subscribe(x => {
          const isNew = data.option_id === 0;
          this.notification.create();
          data.option_id = +(x['option'] as Option).option_id;
          this.survey.saveOption(data, isNew);
        })
  }


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


  updateSurvey(event: Survey) {
    const canSave = (+event.survey_isactive === 1) ? this.isSurveyCanPublished(event) : true;
    if (!canSave) return;
    this.notification.create(SavingNotification);
    this._surveySrvc
        .update(event)
        .take(1)
        .subscribe(
          data => {
            this.notification.create();
            this.survey = new SurveyQuestion(Object.assign({}, this.survey, event))
          },
          err => {},
          () => {
            if (+event.survey_isactive === 1) this.modalInstance = this.modalService.open(this.content);
          }
        );
  }



  notifyUsers() {
    if (this.modalInstance) this.modalInstance.close();
    this.notification.create({
      message: 'Sending notification email to users.',
      type: NotificationType.warning
    }, 0);

    this._surveySrvc
        .notifyUserSurvey(this.survey as Survey)
        .take(1)
        .subscribe(
          data => {
            this.notification.create();
          }
        )
  }



  private isSurveyCanPublished(event: Survey) {
    let canpublished = true;
    if (this.survey.questions.length) {
      this.notification.create({
        message: 'Cannot published, there are no questions for this survey.',
        type: NotificationType.danger
      });
      this.survey = new SurveyQuestion(Object.assign({}, this.survey, { survey_isactive: 0}))
      canpublished = false;
    }


    if (this.survey.durations.length) {
      this.notification.create({
        message: 'Cannot published, there are no active duration for this survey.',
        type: NotificationType.danger
      });
      this.survey = new SurveyQuestion(Object.assign({}, this.survey, { survey_isactive: 0}))
      canpublished = false;
    }else {
      const time_now = new Date();
      let hasActiveDuration = false;
      this.survey.durations.forEach(x => {
        const end_time = new Date(x.end_date);
        if (end_time > time_now) {
          hasActiveDuration = true;
          return;
        }
      })
      if (!hasActiveDuration) {
        this.notification.create({
          message: 'Cannot published, there are no active duration for this survey.',
          type: NotificationType.danger
        });
        this.survey = new SurveyQuestion(Object.assign({}, this.survey, { survey_isactive: 0}))
        canpublished = false;
      }
    }
    return canpublished;
  }

  ngOnDestroy() {
    this.id_param_subscription.unsubscribe();
    if (this.modalInstance) this.modalInstance.close();
  }

}
