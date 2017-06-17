import { Component, OnInit, Inject } from '@angular/core';
import { ISurveyService } from 'app/core/contracts/i-http-services';
import { SurveyService } from './../survey.service';
import { ISurveyForList } from './../i-survey';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import "rxjs/add/operator/mergeMap";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'sur-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {

  constructor(@Inject(SurveyService) private _surveySrvc: ISurveyService,
               private _route: Router,
               private modalService: NgbModal) { }


  open(content) {
    this.modalService.open(content,{
      size: 'lg'
    });
  }

  surveys: ISurveyForList[] = [];
  ngOnInit() {


    let subs: ISubscription = this._surveySrvc.list().subscribe(
      data => {
        this.surveys = <ISurveyForList[]>data.survey
      },
      err => {},
      () => subs.unsubscribe()
    )


    //     this._surveySrvc.list().flatMap((survey: any) => {
    //   return this._surveySrvc.getRespondentsCount(survey.id)
    //   .map((res: any) => res.json())
    // }).subscribe(
    //   data=> console.log(data)
    // );

  }

  addSurvey(event){
    console.log(event);
  }
  view(id: number){
    this._route.navigate(['surveys',id]);
  }
}
