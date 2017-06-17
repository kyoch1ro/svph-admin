import { Component, OnInit, Inject } from '@angular/core';
import { IUserService } from 'app/core/contracts/i-http-services';
import { UserService } from './../user.service';
import { IUserDTO } from './../i-user';
import { Router } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
@Component({
  selector: 'usr-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(@Inject(UserService) private _userSrvc: IUserService,
              private _route: Router) { }
  users : IUserDTO[] = [];
  ngOnInit() {
    let subs: ISubscription = this._userSrvc.list().subscribe(
      data => this.users = <IUserDTO[]>data.user,
      err => {},
      () => subs.unsubscribe()
    )
  }

  view(id: number){
    this._route.navigate(['users',id]);
  }
}



// listUser