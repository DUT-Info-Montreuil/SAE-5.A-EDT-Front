import { FormControl, Validators } from '@angular/forms';

export class AuthLoginForm {
    email: FormControl = new FormControl('', [Validators.required, Validators.email]);
    password: FormControl = new FormControl('', [Validators.required, Validators.minLength(8)]);
}
