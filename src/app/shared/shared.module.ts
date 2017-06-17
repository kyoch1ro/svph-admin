import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule  }  from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './sidebar.directive';
import { AsideToggleDirective } from './aside.directive';
import { BreadcrumbsComponent } from './breadcrumb.component';
import { NAV_DROPDOWN_DIRECTIVES } from './nav-dropdown.directive';
import { SideBarComponent } from './side-bar/side-bar.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { AlertComponent } from './alert/alert.component';

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
    HeaderComponent, 
    SIDEBAR_TOGGLE_DIRECTIVES,
    NAV_DROPDOWN_DIRECTIVES,
    AsideToggleDirective,
    BreadcrumbsComponent,
    SideBarComponent,
    LoginFormComponent,
    AlertComponent,
    
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HeaderComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    BreadcrumbsComponent,
    NAV_DROPDOWN_DIRECTIVES,
    SideBarComponent,
    LoginFormComponent,
    AlertComponent,
    NgbModule
  ]
})
export class SharedModule { }
