import { SimpleLayoutComponent } from './core/layouts/simple-layout.component';
import { FullLayoutComponent } from './core/layouts/full-layout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'app/core/guards/login.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [LoginGuard],
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [LoginGuard],
        data: {
          title: 'Dashboard'
        }
      },

      {
        path: 'users',
        loadChildren: './user/user.module#UserModule',
        canActivate: [LoginGuard],
      },
      {
        path: 'surveys',
        loadChildren: './survey/survey.module#SurveyModule',
        canActivate: [LoginGuard],
      }
    ]
  },


  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
