import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SURVEY_PROVIDERS } from './survey.service';
import { PagesRoutingModule } from './pages-routing.module';
import { SurveyComponent } from './survey.component';
import { SurveysComponent } from './surveys/surveys.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { FormComponent } from './shared/form/form.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    SharedModule
  ],
  declarations: [SurveyComponent, SurveysComponent, AddComponent, ViewComponent, FormComponent],
  providers: [SURVEY_PROVIDERS]
})
export class SurveyModule { }
