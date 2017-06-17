import { Component, OnInit, Inject } from '@angular/core';
import { IUserService } from 'app/core/contracts/i-http-services';
import { UserService } from './../user.service';
import { IUserDTO } from './../i-user';
import { ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'usr-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  user: IUserDTO;
alert
  approved_pending: boolean = false;
  constructor(@Inject(UserService) private _userSrvc: IUserService,
              private _route: ActivatedRoute,
              private modalService: NgbModal) { }

  
  
        
  ngOnInit() {
    let params_subs: ISubscription = 
    this._route.params
      .subscribe(
        params => this.setUser(<number> params['id']),
        err => {},
        () => params_subs.unsubscribe()
    );

  }

  setUser(id: number){
    let profileInfo: ISubscription = 
    this._userSrvc.getById(id)
      .map(data => data.user)
      .subscribe(
        data=> this.user = <IUserDTO> data,
        err => {},
        () => profileInfo.unsubscribe
      );
  }


  verifyUser(id: number){
    this.approved_pending = true;
    this._userSrvc.approveUser(id).subscribe(
      data => {},
      err => {},
      () => {
        this.approved_pending = false;
        this.user.is_verified = 1;
      }
    );
  }

  open(content){
    this.modalService.open(content,{
      size:'lg',
      windowClass:'img-holder'
    });
  }

}
