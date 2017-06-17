import { Component, OnInit, Input} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { IAlert } from 'app/core/contracts/i-alert';
@Component({
  selector: 'shrd-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {
  @Input() alert: IAlert;
  // @Input() set alert(val){
  //   this._alert.next(val);
  // }
  
  // get alert(){
  //   return this._alert.getValue();
  // }

  
  // private _alert: BehaviorSubject<IAlert> = new BehaviorSubject<IAlert>({ msg: "", status : ""});
  constructor() { }

  ngOnInit() {
  }

}
