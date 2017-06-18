import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { SURVEY_PROVIDERS } from './survey.service';
import { PagesRoutingModule } from './pages-routing.module';
import { SurveyComponent } from './survey.component';
import { SurveysComponent } from './surveys/surveys.component'
import { ViewComponent } from './view/view.component';
import { FormComponent } from './shared/form/form.component';
import { CategoryModule } from './category/category.module';
import { TypeModule } from './type/type.module';
@NgModule({
  imports: [
    PagesRoutingModule,
    SharedModule,
    CategoryModule,
    TypeModule
  ],
  declarations: [SurveyComponent, SurveysComponent, ViewComponent, FormComponent],
  providers: [SURVEY_PROVIDERS]
})
export class SurveyModule { }
