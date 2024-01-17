import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, ElementRef, Input, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-labeled-date-input',
    templateUrl: './labeled-date-input.component.html',
    styleUrls: ['./labeled-date-input.component.css'],
    animations: [trigger('fade', [state('void', style({ opacity: 0 })), transition(':enter, :leave', [animate('0.5s ease')])])],
})
export class LabeledDateInputComponent implements AfterViewInit, OnDestroy {
    @Input() label!: string;
    @Input() placeholder = '';
    @Input() hasAction = false;
    @Input() control!: FormControl;
    @Input() startOfWeek = false;
    @ViewChild('dateInput') dateInput!: ElementRef;

    private flatpickrInstance: any;
    private controlValueChangesSubscription!: Subscription;

    ngAfterViewInit() {
        this.initializeFlatpickr();
    }

    private initializeFlatpickr() {
        this.flatpickrInstance = flatpickr(this.dateInput.nativeElement, {
            altInput: true,
            allowInput: true,
            altFormat: 'd/m/Y',
            dateFormat: 'Y-m-d',
            onOpen: (selectedDates: Date[]) => {
                if (this.startOfWeek && selectedDates[0]) {
                    this.adjustDateToStartOfWeek(selectedDates[0]);
                }
            },
        });

        this.controlValueChangesSubscription = this.control.valueChanges.subscribe((value) => {
            if (this.flatpickrInstance && value) {
                let newDate = new Date(value);

                if (this.startOfWeek) {
                    newDate = this.adjustDateToStartOfWeek(newDate);
                }

                const flatpickrDate = this.flatpickrInstance.selectedDates[0];

                if (!flatpickrDate || flatpickrDate.getTime() !== newDate.getTime()) {
                    this.flatpickrInstance.setDate(newDate, true);
                }
            }
        });
    }

    private adjustDateToStartOfWeek(date: Date): Date {
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1);
        return new Date(date.setDate(diff));
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
