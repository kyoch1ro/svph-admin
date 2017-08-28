import { SURVEY_DURATION_PROVIDERS } from './services/duration.service';
import { SURVEY_PROVIDERS } from './services/survey.service';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { SurveyComponent } from './survey.component';
import { SurveysComponent } from './surveys/surveys.component'
import { ViewComponent } from './view/view.component';
import { FormComponent } from './shared/form/form.component';
import { CategoryModule } from './category/category.module';
import { TypeModule } from './type/type.module';
import { QuestionModule } from './question/question.module';
import { OptionModule } from './question/option/option.module';
import { DurationComponent } from './shared/form/duration/duration.component';
@NgModule({
  imports: [
    PagesRoutingModule,
    SharedModule,
    CategoryModule,
    QuestionModule,
    OptionModule,
    TypeModule
  ],
  declarations: [SurveyComponent, SurveysComponent, ViewComponent, FormComponent, DurationComponent],
  providers: [SURVEY_PROVIDERS, SURVEY_DURATION_PROVIDERS]
})
export class SurveyModule { }
