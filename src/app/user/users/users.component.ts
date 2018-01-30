import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUserService } from 'app/core/contracts/i-http-services';
import { ISubscription } from 'rxjs/Subscription';

import { User } from '../user.model';
import { UserService } from './../user.service';

@Component({
  selector: 'usr-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  approved = '';
  // removed the IUserService
  constructor(private _userSrvc: UserService,
              private _route: Router) { }
  ngOnInit() {
    const subs: ISubscription = this._userSrvc.list().subscribe(
      data => this.users = <User[]>data.user,
      err => {},
      () => subs.unsubscribe()
    )


    this._userSrvc
        .usersCount()
        .take(1).subscribe(x => {
          this.approved = x['approvedusers'] + '/' + x['allusers'];
        });
  }

  view(id: number) {
    this._route.navigate(['users', id]);
  }
}
