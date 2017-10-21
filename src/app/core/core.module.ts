import { SIDEBAR_TOGGLE_DIRECTIVES } from './directives/sidebar.directive';
import { AsideToggleDirective } from './directives/aside.directive';
import { NAV_DROPDOWN_DIRECTIVES } from './directives/nav-dropdown.directive';
import { BreadcrumbsComponent } from './components/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AppErrorHandler } from './error-handlers/app-error-handler';
import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AUTH_PROVIDERS } from './services/auth.service';
import { LoginGuard } from './guards/login.guard';
import { SideBarComponent } from 'app/core/components/side-bar/side-bar.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BsDropdownModule
  ],
  declarations: [
    NavbarComponent,
    SideBarComponent,
    SimpleLayoutComponent,
    FullLayoutComponent,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES
  ],
  providers: [
    AUTH_PROVIDERS,
    LoginGuard,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ],
  exports: [
    SimpleLayoutComponent,
    FullLayoutComponent
  ]
})
export class CoreModule { }
