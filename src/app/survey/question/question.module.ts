import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { QUESTION_PROVIDERS } from './question.service';
import { FormComponent } from './shared/form/form.component';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports:[
    FormComponent
  ],
  declarations: [FormComponent],
  providers: [QUESTION_PROVIDERS]
})
export class QuestionModule { }
