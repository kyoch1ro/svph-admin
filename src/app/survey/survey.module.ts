import { DurationFormComponent } from './shared/form/duration-form/duration.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { PagesRoutingModule } from './pages-routing.module';
import { CATEGORY_PROVIDERS } from './services/category.service';
import { SURVEY_DURATION_PROVIDERS } from './services/duration.service';
import { OPTION_PROVIDERS } from './services/option.service';
import { QUESTION_PROVIDERS } from './services/question.service';
import { SURVEY_TYPE_PROVIDERS } from './services/survey-type.service';
import { SURVEY_PROVIDERS } from './services/survey.service';
import { OptionFormComponent } from './shared/form/option-form/form.component';
import { QuestionFormComponent } from './shared/form/question-form/question-form.component';
import { SurveyFormComponent as SurveyForm } from './shared/form/survey-form/form.component';
import { QuestionFormComponent as NewQuestionForm } from './shared/q-form/q-form.component';
import { QuestionCarouselComponent } from './shared/question-carousel/question-carousel.component';
import { SurveyComponent } from './survey.component';
import { SurveysComponent } from './surveys/surveys.component';
import { ViewComponent } from './view/view.component';
import { DurationFormListComponent } from './shared/duration-form-list/duration-form-list.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    SharedModule
  ],
  declarations: [
    SurveyComponent,
    SurveysComponent,
    ViewComponent,
    SurveyForm,
    DurationFormComponent,
    QuestionFormComponent,
    OptionFormComponent,
    NewQuestionForm,
    QuestionCarouselComponent,
    DurationFormListComponent
  ],
  providers: [
    SURVEY_PROVIDERS,
    SURVEY_DURATION_PROVIDERS,
    CATEGORY_PROVIDERS,
    QUESTION_PROVIDERS,
    OPTION_PROVIDERS,
    SURVEY_TYPE_PROVIDERS
  ]
})
export class SurveyModule { }
