import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { ISurveyService, IQuestionService, IOptionService } from 'app/core/contracts/i-http-services';
import { SurveyService } from './../survey.service';
import { QuestionService } from './../question/question.service';
import { OptionService } from './../question/option/option.service';
import { ISurveyForList,IQuestionDTO,ISurveyDTO,IOptionDTO,IOptionForm } from './../i-survey';
import { IAlert } from 'app/core/contracts/i-alert';
import { Survey } from './../survey.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/forkJoin';
@Component({
  selector: 'sur-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  survey: Survey;
  isPending: boolean;
  isQuestionPending: boolean;
  isAddOptionPending = [];
  alert: IAlert;
  modalReference: any;
  
  constructor(@Inject(SurveyService) private _surveySrvc: ISurveyService,
              @Inject(QuestionService) private _questionSrvc: IQuestionService,
              @Inject(OptionService) private _optionSrvc: IOptionService,
              private _route: ActivatedRoute,

              private modalService: NgbModal) { }
  ngOnInit() {
    let id_param_subscription = 
      this._route.params.switchMap((params: Params) => 
      Observable.forkJoin([
        this._surveySrvc.getById(params['id']),
        this._questionSrvc.list(params['id'])
      ])).map((data: any) => {
        let survey : ISurveyDTO = data[0].survey;
        let questions: IQuestionDTO[] = data[1].questionnaire;
        survey.questions = questions;
        return survey;
      })
      .subscribe(
        data => this.survey = new Survey(data),
        err => {},
        () => {
          id_param_subscription.unsubscribe();
        }
      );


  }

  open(content) {
    this.modalReference = this.modalService.open(content,{
      size: 'lg'
    });
  }


  updateQuestion(index, event){
    console.log('Question Update Event: ', event);
  }

  updateOption(question_indx,option_indx,event){
    console.log('Option Update Event: ',question_indx,option_indx,event)
  }

  addOption(question_indx,event){
    let option = 
    this.isAddOptionPending[question_indx] = true;
    let data = <IOptionDTO> event;
    data.question_id = this.survey.questions[question_indx].question_id;
    
    let add_opt: ISubscription = 
      this._optionSrvc.add(data).subscribe(
        data => {
          
          this.survey.questions[question_indx].options.push(data.option)
        },
        err=> {
          this.isAddOptionPending[question_indx] = false
        },
        () => {
          this.isAddOptionPending[question_indx] = false,
          add_opt.unsubscribe()
        }
      )
  }

  addQuestion(event){
    this.isQuestionPending = true;
    event['survey_id'] = this.survey.id;
    let add_que: ISubscription = this._questionSrvc.add(event).subscribe(
      data => {
        this.survey.questions.push(data.question);
      },
      err => {
        this.isQuestionPending = false;
      },
      () => {
        this.modalReference.close();
        this.isQuestionPending = false;
        add_que.unsubscribe();
      }

    );
  }

  updateSurvey(event){
    console.log('Survey Update Event: ', event);
  }
  // setSurvey(id: number){
  //   let sur_sub: ISubscription = 
  //     this._surveySrvc.getById(id)
  //     .subscribe(
  //       data => this.survey = new Survey(data),
  //       err => {},
  //       () => {
  //         sur_sub.unsubscribe();
  //       })
  // }
}
