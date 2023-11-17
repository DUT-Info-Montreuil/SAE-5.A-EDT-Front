import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFormattingService } from 'src/app/services/date-formatting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  formattedDate: string | null;
  isOldPasswordVisible: boolean = false;
  isNewPasswordVisible: boolean = false;
  isConfirmPasswordVisible: boolean = false;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private dateFormattingService: DateFormattingService) {
    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required , Validators.minLength(8) , Validators.maxLength(15)]] ,
      oldPassword:['', [Validators.required , Validators.minLength(8) , Validators.maxLength(15) ]] ,
      confirmPassword: ['', Validators.required]
    }, { validator: [ this.passwordMatchValidator , this.passwordNotMatchValidator ]  });
  
      this.formattedDate = this.dateFormattingService.format(new Date());
  }

  get oldPasswordControl(): FormControl {
    return this.passwordForm.get('oldPassword') as FormControl;
  }
  get newPasswordControl(): FormControl {
    return this.passwordForm.get('newPassword') as FormControl;
  }

  get confirmationControl(): FormControl {
    return this.passwordForm.get('confirmPassword') as FormControl;
  }
 
  passwordMatchValidator(fg: FormGroup) {
    const newPasswordControl = fg.get('newPassword');
    const confirmPasswordControl = fg.get('confirmPassword');
  
    if (newPasswordControl && confirmPasswordControl ) {
      const newPassword = newPasswordControl.value;
      const confirmPassword = confirmPasswordControl.value;  
      if (newPassword === confirmPassword ) {
        confirmPasswordControl.setErrors(null);
      } else {
        confirmPasswordControl.setErrors({ passwordsNotMatch: true });
      }
    }
  }

  passwordNotMatchValidator(fg: FormGroup) {
    const newPasswordControl = fg.get('newPassword');
    const oldPasswordControl = fg.get('oldPassword');
  
    if (newPasswordControl && oldPasswordControl ) {
      const newPassword = newPasswordControl.value;
      const oldPassword = oldPasswordControl.value;  

      if (newPassword === oldPassword ) {
        newPasswordControl.setErrors({ passwordsMatch: true });
      } else {
        newPasswordControl.setErrors(null);
      }
    }
  }
}