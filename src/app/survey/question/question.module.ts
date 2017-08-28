import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { QUESTION_PROVIDERS } from './question.service';
import { OptionModule } from './option/option.module';
@NgModule({
  imports: [
    SharedModule,
    OptionModule
  ],
  exports: [
    
  ],
  declarations: [],
  providers: [QUESTION_PROVIDERS]
})
export class QuestionModule { }
