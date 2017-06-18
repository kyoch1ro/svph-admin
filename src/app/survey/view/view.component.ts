import { Component, OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { ISurveyService } from 'app/core/contracts/i-http-services';
import { SurveyService } from './../survey.service';
import { ISurveyForList } from './../i-survey';
import { IAlert } from 'app/core/contracts/i-alert';
import { Survey } from './../survey.model';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'sur-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  survey: Survey;
  isPending: boolean;
  alert: IAlert;

  constructor(@Inject(SurveyService) private _surveySrvc: ISurveyService,
              private _route: ActivatedRoute) { }
  ngOnInit() {
    let id_param_subscription = 


    this._route.params.switchMap((params: Params) => this._surveySrvc.getById(params['id']))
      .subscribe(
        data => this.survey = new Survey(data),
        err => {},
        () => id_param_subscription.unsubscribe()
    );

  }


  updateSurvey(event){

    return;
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
