import { SurveyService } from '../services/survey.service';
import { ISurveyForList } from '../shared/survey.interface';
import 'rxjs/add/operator/mergeMap';

import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAlert } from 'app/core/contracts/i-alert';
import { ISurveyService } from 'app/core/contracts/i-http-services';
import { ISubscription } from 'rxjs/Subscription';




@Component({
  // tslint:disable-next-line:component-selector
  selector: 'sur-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit, OnDestroy {

  alert: IAlert;
  isPending: boolean;
  surveys: ISurveyForList[] = [];

  modalReference: any;
  constructor(@Inject(SurveyService) private _surveySrvc: ISurveyService,
               private _route: Router,
               private modalService: NgbModal) { }


  ngOnInit() {
    const subs: ISubscription = this._surveySrvc.list().subscribe(
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

  open(content) {
    this.modalReference = this.modalService.open(content, {
      size: 'lg'
    });
  }
  addSurvey(event) {
    this.isPending = true;
    const add_sub: ISubscription = this._surveySrvc.add(event).subscribe(
                    data => {
                      this._route.navigate([`/surveys/${data['survey'].id}`])
                    },
                    err => {
                      this.alert = { msg: 'Please try again later', status: 'danger' }
                      this.isPending = false;
                    },
                    () => {
                      add_sub.unsubscribe();
                    }
                  );
  }
  view(id: number) {
    this._route.navigate(['surveys', id]);
  }

  ngOnDestroy() {
    if (this.modalReference) { this.modalReference.close(); }
  }
}
