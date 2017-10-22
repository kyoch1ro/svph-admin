import { ISubscription } from 'rxjs/Subscription';
import { INotification, MainNotificationService, NotificationType } from '../../services/main-notification.service';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {  iAuth } from 'app/core/contracts/iAuth';
import { AuthService } from 'app/core/services/auth.service';
@Component({
  selector: 'core-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  notifSubscription: ISubscription;
  notifMessage: INotification;

  constructor(@Inject(AuthService) private _auth: iAuth,
              private notification: MainNotificationService) { }

  ngOnInit() {
    this.notifSubscription = this.notification.notification$.subscribe(data => this.notifMessage = data );
  }

  logout() {
    this._auth.logout();
  }


  get NotifClass() {
    return NotificationType[+this.notifMessage.type];
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }



  ngOnDestroy() {
    this.notifSubscription.unsubscribe();

  }
}
