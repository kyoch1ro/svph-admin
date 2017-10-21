import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './sidebar.directive';
import { AsideToggleDirective } from './aside.directive';
import { BreadcrumbsComponent } from './breadcrumb.component';
import { NAV_DROPDOWN_DIRECTIVES } from './nav-dropdown.directive';
import { LoginFormComponent } from './login-form/login-form.component';
import { AlertComponent } from './alert/alert.component';
import { SaveSpinnerComponent } from './save-spinner/save-spinner.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BsDropdownModule,
    TabsModule,
    NgbModule
  ],
  declarations: [
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    AsideToggleDirective,
    LoginFormComponent,
    AlertComponent,
    SaveSpinnerComponent,
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES,
    LoginFormComponent,
    AlertComponent,
    NgbModule,
    SaveSpinnerComponent
  ]
})
export class SharedModule { }
