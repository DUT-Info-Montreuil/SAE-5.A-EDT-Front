import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthLoginForm } from 'src/app/models/forms/AuthLoginForm';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent {
    isPasswordVisible = false;
    isLoading = false;

    async submit() {
        this.isLoading = true;
    }
}
