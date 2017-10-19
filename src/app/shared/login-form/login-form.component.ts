import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAlert } from 'app/core/contracts/i-alert';
import { IFormComponent } from 'app/core/contracts/i-form-component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'shrd-login-form',
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
  form: FormGroup;
  btnLabel = 'Login';
  constructor(private fb: FormBuilder) { }



  ngOnInit() {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })

    this._isPending.subscribe(data => this.toggleControls(data));
  }

  onSubmit(data: any) {
    if (this.form.invalid) {
      this.alert = { msg: 'Username and password are required.', status: 'danger' };
      return;
    }
    this.formSubmit.emit(data);
  }

  isDirty(): boolean {
    return;
  }

  toggleControls(data: boolean) {
    if (data) {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).disable();
      });
    }else {
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key).enable();
      });
    }
  }

}
