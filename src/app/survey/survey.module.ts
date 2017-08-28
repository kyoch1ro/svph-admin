import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';
import { OptionModule } from './question/option/option.module';
import { QuestionModule } from './question/question.module';
import { CATEGORY_PROVIDERS } from './services/category.service';
import { SURVEY_DURATION_PROVIDERS } from './services/duration.service';
import { OPTION_PROVIDERS } from './services/option.service';
import { QUESTION_PROVIDERS } from './services/question.service';
import { SURVEY_PROVIDERS } from './services/survey.service';
import { OptionFormComponent } from './shared/form/option-form/form.component';
import { QuestionFormComponent } from './shared/form/question-form/question-form.component';
import { DurationComponent } from './shared/form/survey-form/duration/duration.component';
import { FormComponent as SurveyForm } from './shared/form/survey-form/form.component';
import { SurveyComponent } from './survey.component';
import { SurveysComponent } from './surveys/surveys.component';
import { TypeModule } from './type/type.module';
import { ViewComponent } from './view/view.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    SharedModule,
    TypeModule
  ],
  declarations: [
    SurveyComponent,
    SurveysComponent,
    ViewComponent,
    SurveyForm,
    DurationComponent,
    QuestionFormComponent,
    OptionFormComponent
  ],
  providers: [
    SURVEY_PROVIDERS,
    SURVEY_DURATION_PROVIDERS,
    CATEGORY_PROVIDERS,
    QUESTION_PROVIDERS,
    OPTION_PROVIDERS
  ]
})
export class SurveyModule { }
