import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';
import { OptionModule } from './question/option/option.module';
import { QuestionModule } from './question/question.module';
import { CATEGORY_PROVIDERS } from './services/category.service';
import { SURVEY_DURATION_PROVIDERS } from './services/duration.service';
import { SURVEY_PROVIDERS } from './services/survey.service';
import { DurationComponent } from './shared/form/duration/duration.component';
import { FormComponent } from './shared/form/form.component';
import { SurveyComponent } from './survey.component';
import { SurveysComponent } from './surveys/surveys.component';
import { TypeModule } from './type/type.module';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    SharedModule,
    QuestionModule,
    OptionModule,
    TypeModule
  ],
  declarations: [
    SurveyComponent,
    SurveysComponent,
    ViewComponent,
    FormComponent,
    DurationComponent
  ],
  providers: [
    SURVEY_PROVIDERS,
    SURVEY_DURATION_PROVIDERS,
    CATEGORY_PROVIDERS
  ]
})
export class SurveyModule { }
