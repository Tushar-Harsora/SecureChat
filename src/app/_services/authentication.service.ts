import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/User';
import { RegisterEmailRequest } from '../_models/RegisterEmailRequest';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        const userObject = localStorage.getItem('currentUser');
        this.currentUserSubject = new BehaviorSubject<User>((userObject !== null ? JSON.parse(userObject) : new User()));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(Email: string, signedText: string) {
        return this.http.post<User>(`${environment.apiUrl}/User/AuthenticateByEmail`, { Email, signedText })
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(email: string, username: string, public_key: string){
        return this.http.post<any>(`${environment.apiUrl}/User/RegisterByEmail`, {email, username, public_key})
            .pipe(map(response => {
                console.log(response);
                return response;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(new User());
    }
}
