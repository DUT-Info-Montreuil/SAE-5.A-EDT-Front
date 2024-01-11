import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select } from '@ngrx/store';
import flatpickr from 'flatpickr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-labeled-time-input',
    templateUrl: './labeled-time-input.component.html',
    styleUrls: ['./labeled-time-input.component.css'],
    animations: [trigger('fade', [state('void', style({ opacity: 0 })), transition(':enter, :leave', [animate('0.5s ease')])])],
})
export class LabeledTimeInputComponent implements AfterViewInit {
    @Input() label!: string;
    @Input() placeholder: string = '';
    @Input() hasAction: boolean = false;
    @Input() control!: FormControl;
    @ViewChild('timeInput') timeInput!: ElementRef;

    private flatpickrInstance: any;
    private controlValueChangesSubscription!: Subscription;

    ngAfterViewInit() {
        this.initializeFlatpickr();
    }

    private initializeFlatpickr() {
        this.flatpickrInstance = flatpickr(this.timeInput.nativeElement, {
            altInput: true,
            allowInput: true,
            enableTime: true,
            noCalendar: true,
            altFormat: 'H:i',
            time_24hr: true,
            minuteIncrement: 10,
            dateFormat: 'H:i',
            onChange: (selectedDates, dateStr, instance) => {
                const selectedDate = selectedDates[0];

                if (selectedDate) {
                    const roundedMinutes = Math.round(selectedDate.getMinutes() / 10) * 10;
                    selectedDate.setMinutes(roundedMinutes);

                    if (selectedDate.getTime() !== instance.latestSelectedDateObj?.getTime()) {
                        this.control.setValue(dateStr);
                    }
                }
            },
        });

        this.controlValueChangesSubscription = this.control.valueChanges.subscribe((value) => {
            if (this.flatpickrInstance && value) {
                const flatpickrTime = this.flatpickrInstance.latestSelectedDateObj;
                const newTime = new Date(value);

                if (!flatpickrTime || flatpickrTime.getTime() !== newTime.getTime()) {
                    this.flatpickrInstance.setDate(value, false);
                }
            }
        });
    }

    ngOnDestroy() {
        if (this.controlValueChangesSubscription) {
            this.controlValueChangesSubscription.unsubscribe();
        }
        if (this.flatpickrInstance) {
            this.flatpickrInstance.destroy();
        }
    }
}
