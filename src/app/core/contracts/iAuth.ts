import { Observable } from 'rxjs/Observable';
export interface iAuth{
    login(user: string, password: string): Observable<any>;
    logout(): void;
    getUser(): string;
    isLoggedIn(): boolean;
    getToken(): string;
    isAdmin(): boolean;
    IsValidToken():boolean;
}
