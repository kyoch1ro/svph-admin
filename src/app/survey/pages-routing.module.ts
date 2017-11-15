import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey.component';
import { SurveysComponent } from './surveys/surveys.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
      {
        path: '',
        component: SurveyComponent,
        data: {
            title: 'Surveys'
        },
        children:[
             {
                path: '',
                component: SurveysComponent,
                data: {
                    title: 'List'
                }
            },
            {
                path: ':id',
                component: ViewComponent,
                data: {
                    title: 'View'
                }
            }
        ]
    }
];





@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
