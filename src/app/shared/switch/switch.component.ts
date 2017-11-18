import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'shrd-switch',
  template: `
  <label class="switch">
    <input [attr.checked]="checked ? '' : null">
    <span  (click)="changed($event)" class="slider round"></span>
  </label>
  `,
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  @Input() checked = false;
  @Output() toggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor() { }


  ngOnInit() {
  }


  changed(event) {
    this.checked = !this.checked;
    // this._checked.next(!this.checked);
    this.toggled.emit(this.checked);
  }


}
