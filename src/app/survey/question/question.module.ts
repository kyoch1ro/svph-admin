import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OptionModule } from './option/option.module';
@NgModule({
  imports: [
    SharedModule,
    OptionModule
  ],
  exports: [
  ],
  declarations: [],
  providers: []
})
export class QuestionModule { }
