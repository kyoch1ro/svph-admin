import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { ISubscription } from 'rxjs/Subscription';

import { IAlert } from '../../core/contracts/i-alert';
import { IOptionService, IQuestionService, ISurveyService } from '../../core/contracts/i-http-services';
import { IOptionDTO, IQuestionDTO, ISurveyDTO } from '../i-survey';
import { OptionService } from '../question/option/option.service';
import { QuestionService } from '../question/question.service';
import { Survey } from '../survey.model';
import { SurveyService } from '../survey.service';

import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/switchMap';



@Component({
  selector: 'sur-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  survey: Survey;
  isPending: boolean;


  isOptionPending = []; //id and value only ex 1: false
  isQuestionPending = [];
  

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
        let questions: IQuestionDTO[] = [];

        var items = data[1].questionnaire;
        items.filter(parent => parent.question_parent == 0).map(
          question => {
            question.survey_id = survey.id;
            question.options.map(opt => {
              opt.question_id = question.question_id;
            })
            question.childrens = [];
            questions.push(question)
          }
        )

        items.filter(children => children.question_parent > 0).map(
          children => {
            var parent_indx = questions.findIndex(questions => questions.question_id == children.question_parent);
            children.survey_id = survey.id;
            children.options.map(opt => {
              opt.question_id = children.question_id;
            })
            questions[parent_indx].childrens.push(children);
          }
        )
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

  updateQuestion(event : IQuestionDTO){
    this.isQuestionPending[event.question_id] = true;
    let update_que_sub : ISubscription = 
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
    let add_que: ISubscription = this._questionSrvc.add(event).subscribe(
      data => {
        if(data['question'].option_type == 'enums' || data['question'].option_type == 'text') this._addDefaultOption(data['question'].question_id);
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
    let defaultOption: IOptionDTO = {
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
      err=> {
        },
      () => {
      }
    )
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
  }

  addSubQuestion(index,event){
    this.isQuestionPending[0] = true;
    let add_sub: ISubscription =  this._questionSrvc.add(event).subscribe(
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

}
