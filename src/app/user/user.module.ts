import { NgModule } from '@angular/core';
import { UsersComponent } from './users/users.component';
import { SharedModule } from 'app/shared/shared.module';
import { AddComponent } from './add/add.component';
import { PagesRoutingModule } from './pages-routing.module';
import { USER_PROVIDERS } from './user.service';
import { ViewComponent } from './view/view.component';
import { UserComponent } from './user.component';
@NgModule({
  imports: [
    PagesRoutingModule,
    SharedModule
  ],
  declarations: [UsersComponent, AddComponent, ViewComponent, UserComponent],
  providers: [ USER_PROVIDERS ]
})
export class UserModule { }
