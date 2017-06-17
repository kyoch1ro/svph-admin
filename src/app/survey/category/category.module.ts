import { NgModule } from '@angular/core';
import { CATEGORY_PROVIDERS } from './category.service';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [],
  providers: [
    CATEGORY_PROVIDERS
  ]
})
export class CategoryModule { }
