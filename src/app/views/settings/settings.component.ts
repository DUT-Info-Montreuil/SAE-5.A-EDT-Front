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
  control: any;
  newPasswordForm!: FormGroup;
  isPasswordVisible: boolean = false;



  constructor(private fb: FormBuilder, private dateFormattingService: DateFormattingService) {
      this.formattedDate = this.dateFormattingService.format(new Date());
      this.newPasswordForm = this.fb.group({
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        validation: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get oldPasswordControl(): FormControl {
    return this.newPasswordForm.get('oldPassword') as FormControl;
}

get newPasswordControl(): FormControl {
    return this.newPasswordForm.get('newPassword') as FormControl;
}
get confirmationPasswordControl(): FormControl {
  return this.newPasswordForm.get('confirmation') as FormControl;
}
}