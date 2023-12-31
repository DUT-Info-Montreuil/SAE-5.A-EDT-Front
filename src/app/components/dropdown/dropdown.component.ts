import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.css'],
    animations: [trigger('fade', [state('void', style({ opacity: 0 })), transition(':enter, :leave', [animate('0.5s ease')])]), trigger('dropdownAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]), transition(':leave', [style({ opacity: 1, transform: 'scale(1)' }), animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))])])],
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

    ngOnInit() {
        this.initializeSelectedOption();
    }

    initializeSelectedOption() {
        if (this.control.value) {
            const matchingOption = this.options.find((option) => option.value === this.control.value);
            this.selectedOption = matchingOption ? matchingOption : undefined;
        }
    }

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
