import { Component, OnInit,Inject, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { ISurveyService, IQuestionService, IOptionService } from 'app/core/contracts/i-http-services';
import { SurveyService } from './../survey.service';
import { QuestionService } from './../question/question.service';
import { OptionService } from './../question/option/option.service';
import { ISurveyForList,IQuestionDTO,ISurveyDTO,IOptionDTO } from './../i-survey';
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


  

  isAddQuestionPending: boolean;
  isAddOptionPending = [];
  isUpdateOptionPending = [];
  isUpdateQuestionPending = [];
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
        questions.map(data =>{ 
          data.survey_id = survey.id; 
          data.options.map(opt => {
            opt.question_id = data.question_id;
          })
        })
        survey.questions = questions;
        return survey;
      })
      .subscribe(
        data => {
          this.survey = new Survey(data);
          console.log(this.survey);
        },
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
    this.isUpdateQuestionPending[index] = true;
    let update_que_sub : ISubscription = 
      this._questionSrvc.update(event).subscribe(
        data => {},
        err => {
          this.isUpdateQuestionPending[index] = false;
          console.log(err);
        },
        () => {
          this.isUpdateQuestionPending[index] = false;
          update_que_sub.unsubscribe();
        }
      )
  }

  updateOption(question_indx,option_indx,event){
    
    this.isUpdateOptionPending[event.option_id] = true;
    let update_opt: ISubscription =  this._optionSrvc.update(event).subscribe(
      data => {},
      err=> {
        console.log(err)
        this.isUpdateOptionPending[event.option_id] = false;
      },
      () => {
        update_opt.unsubscribe();
        this.isUpdateOptionPending[event.option_id] = false;
      })
    // console.log('Option Update Event: ',question_indx,option_indx,event)
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
    this.isAddQuestionPending = true;
    event['survey_id'] = this.survey.id;
    let add_que: ISubscription = this._questionSrvc.add(event).subscribe(
      data => {
        this.survey.questions.push(data.question);
      },
      err => {
        this.isAddQuestionPending = false;
      },
      () => {
        this.modalReference.close();
        this.isAddQuestionPending = false;
        add_que.unsubscribe();
      }

    );
  }

  updateSurvey(event){
    this.isPending = true;
    let upd_sur: ISubscription = this._surveySrvc.update(event).subscribe(
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
    // console.log('Survey Update Event: ', event);
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
