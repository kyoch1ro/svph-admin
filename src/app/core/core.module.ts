import { AppErrorHandler } from './error-handlers/app-error-handler';
import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AUTH_PROVIDERS } from './services/auth.service';
import { LoginGuard } from './guards/login.guard';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AUTH_PROVIDERS,
    LoginGuard,
    { provide: ErrorHandler, useClass: AppErrorHandler }
  ]
})
export class CoreModule { }
