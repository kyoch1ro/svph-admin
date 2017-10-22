import { EventEmitter } from '@angular/core';

export interface IFormComponent {
    btnLabel: string;
    formSubmit: EventEmitter<any>;
    isDirty(): boolean;
}
