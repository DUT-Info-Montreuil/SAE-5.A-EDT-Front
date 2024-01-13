import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-edit-reminder-modal',
    templateUrl: './edit-reminder-modal.component.html',
    styleUrls: ['./edit-reminder-modal.component.css'],
})
export class EditReminderModalComponent {
    @Input() isOpen!: boolean;
    @Output() closed = new EventEmitter<boolean>();
    isLoading = false;

    submit() {
        this.isLoading = true;
    }

    close(reload: boolean = false) {
        this.closed.emit(reload);
    }
}
