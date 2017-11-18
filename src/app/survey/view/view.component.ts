import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';

import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';

import { MainNotificationService, SavingNotification } from '../../core/services/main-notification.service';
import { DurationService } from '../services/duration.service';
import { OptionService } from '../services/option.service';
import { QuestionService } from '../services/question.service';
import { SurveyService } from '../services/survey.service';
import { SurveyFormComponent } from '../shared/form/survey-form/form.component';
import { SURVEY_FORM_PROVIDER } from '../shared/form/survey-form/form.service';
import { Duration } from '../shared/models/duration.model';
import { Option } from '../shared/models/option.model';
import { Question } from '../shared/models/question.model';
import { SurveyQuestion } from '../shared/models/survey.model';
import { CarouselOutput, OutType } from '../shared/question-carousel/question-carousel.component';

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
  activeTab = 'survey';

  constructor(private _surveySrvc: SurveyService,
              private _questionSrvc: QuestionService,
              private _optionSrvc: OptionService,
              private _durSrvc: DurationService,
              private _route: ActivatedRoute,
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

  ngOnDestroy() {
    this.id_param_subscription.unsubscribe();
  }

}
