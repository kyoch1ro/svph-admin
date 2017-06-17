import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy,PathLocationStrategy } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CoreModule }  from 'app/core/core.module';
import { ChartsModule } from 'ng2-charts/ng2-charts';



// Routing Module
import { AppRoutingModule } from './app.routing';



//FEATURE MODULES
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';


import { LoginComponent } from './login/login.component';


// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    NgbModule.forRoot(),
    UserModule,
    ChartsModule,
    HttpModule,
    CoreModule,
    SharedModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    LoginComponent,
    DashboardComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: PathLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
