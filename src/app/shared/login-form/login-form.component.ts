import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy} from '@angular/core';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { FormGroup, 
         FormBuilder, 
         Validators, 
         FormControl} from '@angular/forms';
import { IUserDTO } from 'app/user/i-user';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAlert } from 'app/core/contracts/i-alert';
@Component({
  selector: 'shrd-login-form',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, IFormComponent{
  @Output() formSubmit: EventEmitter<any> = new EventEmitter<any>();
  @Input() set isPending(val: boolean){
    this._isPending.next(val)
  }

  get isPending(){
    return this._isPending.getValue();
  }
  private _isPending: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  @Input() alert: IAlert;
  form : FormGroup;
  constructor(private fb: FormBuilder) { }



  ngOnInit() {
    this.form = this.fb.group({
      email:['',Validators.required],
      password: ['', Validators.required]
    })

    this._isPending.subscribe(data => {
      if(data){
        this.form.get('email').disable();
        this.form.get('password').disable();
      }else{
        this.form.get('email').enable();
        this.form.get('password').enable();
      }
    })
  }

  onSubmit(data: any){
    if(this.form.invalid){ 
      // this._alert.next({ msg:"Username and password are required.", status: "danger" });
      this.alert ={ msg:"Username and password are required.", status: "danger" };
      return; 
    }
    this.formSubmit.emit(data);
  }

  isDirty() :boolean{
    return;
  }

}