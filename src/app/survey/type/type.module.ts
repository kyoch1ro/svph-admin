import { NgModule } from '@angular/core';
import { TYPE_PROVIDERS } from './type.service';
import { SharedModule } from 'app/shared/shared.module';
@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [],
  providers: [TYPE_PROVIDERS]
})
export class TypeModule { }
