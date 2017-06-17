import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { UserComponent } from './user.component';

const routes: Routes = [
    {
        path: '',
        component: UserComponent,
        data: {
            title: 'Users'
        },
        children:[
             {
                path: '',
                component: UsersComponent,  
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
            },
            {
                path: 'add',
                component: AddComponent,
                data: {
                    title: 'Add'
                }
            }
        ]
    }
    
   
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
