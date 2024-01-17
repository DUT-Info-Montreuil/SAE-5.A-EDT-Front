import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
    selector: 'app-create-reminder-modal',
    templateUrl: './create-reminder-modal.component.html',
    styleUrls: ['./create-reminder-modal.component.css'],
})
export class CreateReminderModalComponent {
    @Input() isOpen!: boolean;
    @Output() closed = new EventEmitter<boolean>();
    isLoading: boolean = false;
    reminderForm: FormGroup;

    constructor(private fb: FormBuilder, private router: Router, private darkModeService: DarkModeService) {
        this.reminderForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.required, Validators.minLength(3)]],
            date: ['', [Validators.required]],
        });
    }

    get titleControl(): FormControl {
        return this.reminderForm.get('title') as FormControl;
    }
    get descriptionControl(): FormControl {
        return this.reminderForm.get('description') as FormControl;
    }
    get dateControl(): FormControl {
        return this.reminderForm.get('date') as FormControl;
    }
    submit() {
        if (this.reminderForm.valid) {
            console.log('Form Submitted', this.reminderForm.value);
            this.isLoading = true;
        } else {
            this.reminderForm.markAllAsTouched();
        }
    }

    close(reload: boolean = false) {
        this.closed.emit(reload);
    }
}
