import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
    isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

    constructor() {}

    login(): void {
        this.isAuthenticatedSubject.next(true);
    }

    logout(): void {
        this.isAuthenticatedSubject.next(false);
    }

    get isAuthenticated(): boolean {
        return this.isAuthenticatedSubject.value;
    }
}
