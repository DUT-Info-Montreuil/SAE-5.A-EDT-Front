import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    loginForm: FormGroup;
    isPasswordVisible: boolean = false;
    isLoading: boolean = false;

    constructor(private fb: FormBuilder) {
        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rememberMe: [false],
        });
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
            // Ici l'appel à l'API
        } else {
            this.loginForm.markAllAsTouched();
        }
    }
}
