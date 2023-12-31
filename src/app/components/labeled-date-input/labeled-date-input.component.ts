import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import flatpickr from 'flatpickr';

@Component({
    selector: 'app-labeled-date-input',
    templateUrl: './labeled-date-input.component.html',
    styleUrls: ['./labeled-date-input.component.css'],
    animations: [trigger('fade', [state('void', style({ opacity: 0 })), transition(':enter, :leave', [animate('0.5s ease')])])],
})
export class LabeledDateInputComponent implements AfterViewInit {
    @Input() label!: string;
    @Input() placeholder: string = '';
    @Input() hasAction: boolean = false;
    @Input() control!: FormControl;
    @ViewChild('dateInput') dateInput!: ElementRef;

    ngAfterViewInit() {
        flatpickr(this.dateInput.nativeElement, {
            altInput: true,
            allowInput: true,
            altFormat: 'd/m/Y',
            dateFormat: 'Y-m-d',
        });
    }
}
