import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import axios from 'axios';
import { environment } from '../../environments/environment';
import * as fromUser from '../store/user';
import { User } from '../models/entities';
import { take } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private store: Store<fromUser.UserState>) {}

    async login(loginForm: FormGroup, rememberMe: boolean): Promise<any> {
        try {
            const { username, password } = loginForm.value;
            const response = await axios.post(`${environment.apiUrl}/auth/login`, { username, password });

            const user = new User({ username });

            if (rememberMe) {
                localStorage.setItem('auth', JSON.stringify({ user, token: response.data.token }));
            } else {
                sessionStorage.setItem('auth', JSON.stringify({ user, token: response.data.token }));
            }
            this.store.dispatch(fromUser.setUser({ user, token: response.data.token }));

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    logout(): void {
        this.store.dispatch(fromUser.resetUser());
        localStorage.removeItem('auth');
        sessionStorage.removeItem('auth');
    }

    checkAuthentication(): void {
        let authData = sessionStorage.getItem('auth') || localStorage.getItem('auth');
        if (authData) {
            const { user, token } = JSON.parse(authData);
            this.store.dispatch(fromUser.setUser({ user, token }));
        } else {
            this.store.dispatch(fromUser.resetUser());
        }
    }

    getAuthenticationStatus(): boolean {
        let isAuthenticated = false;
        let user, token;

        this.store
            .select(fromUser.selectUser)
            .pipe(take(1))
            .subscribe((u) => {
                user = u;
            });

        this.store
            .select(fromUser.selectToken)
            .pipe(take(1))
            .subscribe((t) => {
                token = t;
            });

        isAuthenticated = !!user && !!token;
        return isAuthenticated;
    }

    getToken(): string | null {
        let token: string | null = null;
        this.store
            .select(fromUser.selectToken)
            .pipe(take(1))
            .subscribe((t) => {
                token = t;
            });
        return token;
    }

    getUser(): User | null {
        let user: User | null = null;
        this.store
            .select(fromUser.selectUser)
            .pipe(take(1))
            .subscribe((u) => {
                user = u;
            });
        return user;
    }
}
