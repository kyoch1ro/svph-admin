import { SwitchComponent } from './switch/switch.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { AlertComponent } from './alert/alert.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { SaveSpinnerComponent } from './save-spinner/save-spinner.component';
import { TruncatePipe } from './pipes/truncate.pipe';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BsDropdownModule,
    TabsModule,
    NgbModule
  ],
  declarations: [
    LoginFormComponent,
    AlertComponent,
    SaveSpinnerComponent,
    TruncatePipe,
    SwitchComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LoginFormComponent,
    AlertComponent,
    NgbModule,
    SaveSpinnerComponent,
    TruncatePipe,
    SwitchComponent
  ]
})
export class SharedModule { }
