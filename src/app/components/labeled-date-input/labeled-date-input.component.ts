import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import flatpickr from 'flatpickr';

@Component({
    selector: 'app-labeled-date-input',
    templateUrl: './labeled-date-input.component.html',
    styleUrls: ['./labeled-date-input.component.css'],
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
