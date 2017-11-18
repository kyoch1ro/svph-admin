import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';


@Injectable()
export class MainNotificationService {
  private notification = new Subject<INotification>();
  notification$ = this.notification.asObservable();
  timer: any;
  constructor() { }


  create(val?: INotification, timeout = 3000) {
    if (this.timer) clearTimeout(this.timer);
    const msg: INotification = (val) ? val : SuccessNotification;

    this.notification.next(msg);
    if (timeout > 0) {
      this.timer = setTimeout(() => {
        this.notification.next(null);
      }, timeout);
    }
  }


}

export enum NotificationType {
  primary,
  secondary,
  success,
  danger,
  warning,
  info,
  light,
  dark
}

export interface INotification  {
  message: string;
  type: NotificationType
}



export const SuccessNotification: INotification = { message: 'Operation Completed.', type: NotificationType.success }
export const FailedNotification: INotification  = { message: 'Operation Failed.', type: NotificationType.danger }
export const SavingNotification: INotification  = { message: 'Saving...', type: NotificationType.warning }
