import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup } from '@angular/forms';
import axios from 'axios';
import { environment } from '../../environments/environment';
import * as fromUser from '../store/user';
import { User } from '../models/entities';
import { take } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private store: Store<fromUser.UserState>) {}

    async login(loginForm: FormGroup, rememberMe: boolean): Promise<any> {
        try {
            const { username, password } = loginForm.value;
            const response = await axios.post(`${environment.apiUrl}/auth/login`, { username, password });

            let user: User = new User({ username });
            user = await this.getRole(user, response.data.token);

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

    async getRole(user: User, token: string): Promise<User> {
        try {
            const response = await axios.post(
                `${environment.apiUrl}/users/get-roles`,
                { username: user.username },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.data && response.data.role) {
                user.role = response.data.role;
                return user;
            } else {
                throw new Error('Role information is missing in the response.');
            }
        } catch (error) {
            console.error('Error fetching user role:', error);
            this.store.dispatch(fromUser.resetUser());
            this.logout();
            throw error;
        }
    }

    logout(): void {
        this.store.dispatch(fromUser.resetUser());
        localStorage.removeItem('auth');
        sessionStorage.removeItem('auth');
    }

    // checkAuthentication(): void {
    //     let authData = sessionStorage.getItem('auth') || localStorage.getItem('auth');
    //     if (authData) {
    //         const { user, token } = JSON.parse(authData);
    //         this.store.dispatch(fromUser.setUser({ user, token }));
    //     } else {
    //         this.store.dispatch(fromUser.resetUser());
    //     }
    // }

    async checkAuthentication(): Promise<void> {
        let authData = sessionStorage.getItem('auth') || localStorage.getItem('auth');
        if (authData) {
            const { user, token } = JSON.parse(authData);

            try {
                await axios.get(`${environment.apiUrl}/protected`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                this.store.dispatch(fromUser.setUser({ user, token }));
            } catch (error) {
                this.store.dispatch(fromUser.resetUser());
                this.logout();
            }
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
