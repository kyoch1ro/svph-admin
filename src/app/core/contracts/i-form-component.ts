import { EventEmitter } from '@angular/core';

export interface IFormComponent {
    btnLabel: string;
    formSubmit : EventEmitter<any>; //OUTPUT
    isPending : boolean;
    isDirty(): boolean;
    toggleControls(data: boolean): void;
}
