import { Component, OnInit, Inject,OnDestroy } from '@angular/core';
import { ISurveyService } from 'app/core/contracts/i-http-services';
import { SurveyService } from './../survey.service';
import { ISurveyForList } from './../i-survey';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import "rxjs/add/operator/mergeMap";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAlert } from 'app/core/contracts/i-alert';

@Component({
  selector: 'sur-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss']
})
export class SurveysComponent implements OnInit {

  alert: IAlert;
  isPending: boolean;
  surveys: ISurveyForList[] = [];

  modalReference: any;
  constructor(@Inject(SurveyService) private _surveySrvc: ISurveyService,
               private _route: Router,
               private modalService: NgbModal) { }

  
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

  open(content) {
    this.modalReference = this.modalService.open(content,{
      size: 'lg'
    });
  }
  addSurvey(event){
    this.isPending = true;
    let add_sub: ISubscription = this._surveySrvc.add(event).subscribe(
                    data => {
                      this._route.navigate([`/surveys/${data['question'].id}`])
                    },
                    err => {
                      this.alert = { msg: "Please try again later", status: "danger" }
                      this.isPending = false;
                    },
                    () => { 
                      add_sub.unsubscribe();
                    }
                  );
  }
  view(id: number){
    this._route.navigate(['surveys',id]);
  }

  ngOnDestroy(){
    if(this.modalReference) { this.modalReference.close();} 
  }
}
