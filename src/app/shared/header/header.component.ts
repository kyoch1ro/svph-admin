import { Component, OnInit, Inject } from '@angular/core';
import {  iAuth } from 'app/core/contracts/iAuth';
import { AuthService } from 'app/core/services/auth.service';
@Component({
  selector: 'shrd-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  

  constructor(@Inject(AuthService) private _auth: iAuth) { }

  ngOnInit() {
  }

  logout(){
    this._auth.logout();
  }

  public toggled(open: boolean): void {
    console.log('Dropdown is now: ', open);
  }

}
