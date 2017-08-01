import { Component, OnInit, Inject } from '@angular/core';
import { iAuth } from 'app/core/contracts/iAuth';
import { AuthService } from 'app/core/services/auth.service';
import { ISubscription } from 'rxjs/Subscription';
import { IAlert } from 'app/core/contracts/i-alert';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(@Inject(AuthService) private _auth: iAuth,
              private route : Router) { }
  alert : IAlert = { msg: "", status: ""};
  isPending: boolean;
  ngOnInit() {
  }


  login(event){
    this.isPending = true;
    this.alert = { msg: "", status: ""};
    let subs : ISubscription = this._auth.login(event.email, event.password).subscribe(
      data => { 
        localStorage.setItem('token', data.token);
      },
      err => { 
        switch (err['status']) {
          case 422:
            this.alert = {
              msg:"Invalid email.",
              status:"danger"
            }
            break;
          default:
            this.alert = {
              msg:"Invalid Username or password.",
              status: "danger"
            }
        }
        this.isPending = false;
      },
      
      () => { 
        this.route.navigate(['/dashboard']);
        subs.unsubscribe()
        
      }
    )


    // console.log(event);
  }
}
