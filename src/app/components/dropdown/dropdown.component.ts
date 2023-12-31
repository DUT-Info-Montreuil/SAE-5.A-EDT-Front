import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css'],
    animations: [trigger('fade', [state('void', style({ opacity: 0 })), transition(':enter, :leave', [animate('0.5s ease')])])],
})
export class DropdownComponent {
    @Input() options: { value: string; label: string; icon?: string; color?: string }[] = [];
    @Input() placeholder!: string;
    @Input() label!: string;
    @Input() control!: FormControl;
    @Output() selectionChange = new EventEmitter<string>();
    isOpen = false;
    selectedOption?: { value: string; label: string; icon?: string; color?: string };

    constructor() {}

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    close() {
        this.isOpen = false;
    }

    selectOption(option: { value: string; label: string; icon?: string; color?: string }) {
        this.selectedOption = option;
        this.isOpen = false;
        this.control.setValue(option.value);
        this.selectionChange.emit(option.value);
    }
}
