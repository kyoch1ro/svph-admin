import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { OPTION_PROVIDERS } from './option.service';
import { FormComponent } from './shared/form/form.component';
@NgModule({
  imports: [
    SharedModule
  ],
  exports:[
    FormComponent
  ],
  declarations: [FormComponent],
  providers: [OPTION_PROVIDERS]
})
export class OptionModule { }
