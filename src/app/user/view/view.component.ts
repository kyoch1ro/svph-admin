import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUserService } from 'app/core/contracts/i-http-services';
import { ISubscription } from 'rxjs/Subscription';

import { User } from '../user.model';
import { UserService } from './../user.service';

@Component({
  selector: 'usr-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  user: User;
  // alert
  approved_pending = false;
  constructor(@Inject(UserService) private _userSrvc: IUserService,
              private _route: ActivatedRoute,
              private modalService: NgbModal) { }
  ngOnInit() {
    const params_subs: ISubscription =
      this._route.params
        .subscribe(
          params => this.setUser(<number> params['id']),
          err => {},
          () => params_subs.unsubscribe()
      );

  }

  // move to take(1)
  setUser(id: number) {
    const profileInfo: ISubscription =
      this._userSrvc.getById(id)
        .map(data => data.user)
        .subscribe(
          data => this.user = <User> data,
          err => {},
          () => profileInfo.unsubscribe()
        );
  }

  verifyUser(id: number) {
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
