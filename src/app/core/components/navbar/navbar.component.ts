import { Component, OnInit, Inject } from '@angular/core';
import {  iAuth } from 'app/core/contracts/iAuth';
import { AuthService } from 'app/core/services/auth.service';
@Component({
  selector: 'core-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(@Inject(AuthService) private _auth: iAuth) { }

  ngOnInit() {
  }

  logout() {
    this._auth.logout();
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

}
