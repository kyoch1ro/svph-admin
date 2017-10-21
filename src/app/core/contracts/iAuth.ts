import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/Rx';

import { IUser } from './i-user';

// tslint:disable-next-line:class-name
export interface iAuth {
    user: BehaviorSubject<IUser>;
    isLoggedIn(): Observable<boolean>;
    setUserInfo();
    login(user: string, password: string);
    logout(): void;
    getUser(): string;
    checkTokenValidity(): Observable<any>;
}
