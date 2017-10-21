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
@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavbarComponent,
    SideBarComponent,
    SimpleLayoutComponent,
    FullLayoutComponent,
    BreadcrumbsComponent
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
