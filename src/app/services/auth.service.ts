// auth.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import axios from 'axios';
import { User } from '../models/entities';
import { setUser, resetUser } from '../store/user';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private store: Store) {}

    async login(loginForm: FormGroup): Promise<any> {
        try {
            const { username, password, rememberMe } = loginForm.value;
            const response = await axios.post(`${environment.apiUrl}/auth/login`, { username, password });
            if (rememberMe) {
                localStorage.setItem('user', JSON.stringify({ username, password }));
                localStorage.setItem('token', response.data.token);
            }
            this.storeUserData(new User(response.data.user), response.data.token);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    storeUserData(user: User, token: string) {
        this.store.dispatch(setUser({ user, token }));
    }

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.store.dispatch(resetUser());
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }
}
