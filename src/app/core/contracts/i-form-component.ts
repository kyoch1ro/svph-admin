import { EventEmitter } from '@angular/core';

export interface IFormComponent {
    formSubmit : EventEmitter<any>; //OUTPUT
    isPending : boolean;
    isDirty(): boolean;
}
