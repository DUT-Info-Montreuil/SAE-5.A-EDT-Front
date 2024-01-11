import { Component, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

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
    private controlValueChangesSubscription: Subscription = new Subscription();

    ngOnChanges(changes: SimpleChanges) {
        if (changes['control']) {
            this.controlValueChangesSubscription.unsubscribe();
            this.controlValueChangesSubscription = this.control.valueChanges.subscribe((value) => {
                this.setSelectedOption(value);
            });
            this.setSelectedOption(this.control.value);
        }
    }

    ngOnDestroy() {
        if (this.controlValueChangesSubscription) {
            this.controlValueChangesSubscription.unsubscribe();
        }
    }

    private setSelectedOption(value: string) {
        this.selectedOption = this.options.find((option) => option.value === value);
    }

    toggleDropdown() {
        this.isOpen = !this.isOpen;
    }

    close() {
        this.isOpen = false;
    }

    selectOption(option: { value: string; label: string; icon?: string; color?: string }) {
        this.selectedOption = option;
        this.control.setValue(option.value);
        this.selectionChange.emit(option.value);
        this.close();
    }
}
