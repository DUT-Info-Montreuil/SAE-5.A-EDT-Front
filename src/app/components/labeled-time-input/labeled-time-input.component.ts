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
            onChange: this.handleFlatpickrChange.bind(this),
        });

        this.controlValueChangesSubscription = this.control.valueChanges.subscribe((value) => {
            if (this.flatpickrInstance && value) {
                this.flatpickrInstance.setDate(value, false);
            }
        });
    }

    private handleFlatpickrChange(selectedDates: Date[], dateStr: string, instance: flatpickr.Instance): void {
        const selectedDate = selectedDates[0];
        if (selectedDate) {
            const newDateStr = this.getRoundedTime(selectedDate);
            if (newDateStr !== dateStr) {
                instance.setDate(newDateStr, true);
            }
        }
    }

    private getRoundedTime(date: Date): string {
        const minutes = date.getMinutes();
        const roundedMinutes = Math.round(minutes / 10) * 10;
        date.setMinutes(roundedMinutes);
        return date.getHours() + ':' + (roundedMinutes < 10 ? '0' : '') + roundedMinutes;
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
