import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/entities';
import { RoutePaths } from 'src/app/routes';
import { AuthService } from 'src/app/services/auth.service';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    public routes = RoutePaths;
    loginForm: FormGroup;
    isPasswordVisible: boolean = false;
    user: User | null = null;

    isLoading: boolean = false;

    constructor(private fb: FormBuilder, private router: Router, private darkModeService: DarkModeService, private authService: AuthService) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]],
            rememberMe: [false],
        });
    }

    get isDarkMode(): boolean {
        return this.darkModeService.getDarkModeStatus();
    }

    get usernameControl(): FormControl {
        return this.loginForm.get('username') as FormControl;
    }

    get passwordControl(): FormControl {
        return this.loginForm.get('password') as FormControl;
    }

    submit() {
        if (this.loginForm.valid) {
            console.log('Form Submitted', this.loginForm.value);
            this.isLoading = true;

            this.authService
                .login(this.loginForm)
                .then((response) => {
                    this.isLoading = false;
                    this.user = new User(response.data);
                    this.router.navigate([RoutePaths.APP]);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
