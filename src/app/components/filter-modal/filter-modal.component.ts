import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import axios from 'axios';
import { format, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';
import { Subject } from 'rxjs';
import { DarkModeService } from 'src/app/services/dark-mode.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-filter-modal',
    templateUrl: './filter-modal.component.html',
    styleUrls: ['./filter-modal.component.css'],
})
export class FilterModalComponent {
    @Input() isOpen!: boolean;
    @Input() events!: CalendarEvent[];
    @Input() mapIdNomProf!: Map<string, string>;
    @Input() mapIdNomSalle!: Map<string, string>;
    @Input() mapIdNomPromo!: Map<string, string>;
    @Input() viewDate!: Date;
    @Input() refresh!: Subject<void>;
    @Input() view!: CalendarView;
    @Output() closed = new EventEmitter<boolean>();
    @Output() eventsChange = new EventEmitter<CalendarEvent[]>();
    isLoading: boolean = false;

    constructor(private router: Router, private darkModeService: DarkModeService) {}

    submit() {
        this.eventsChange.emit(this.events);
        this.close(true);
    }

    close(reload: boolean = false) {
        this.closed.emit(reload);
    }

    getCurrentTimeDisplay(): string[] {
        let currentWeek: string[] = [];
        if (this.view === CalendarView.Week) {
            currentWeek[0] = format(startOfWeek(this.viewDate), 'yyyy-MM-dd');
            currentWeek[1] = format(endOfWeek(this.viewDate), 'yyyy-MM-dd');
        } else {
            currentWeek[0] = format(startOfDay(this.viewDate), 'yyyy-MM-dd');
            currentWeek[1] = format(endOfDay(this.viewDate), 'yyyy-MM-dd');
        }
        return currentWeek;
    }

    async onSelectProfChange(event: any) {
        let currentWeek: string[] = [];
        currentWeek = this.getCurrentTimeDisplay();

        const data = {
            personnal_id: this.mapIdNomProf.get(event.target.value)?.toString(),
            week_date_start: currentWeek[0],
            week_date_end: currentWeek[1],
        };
        try {
            let response = await axios.post(`${environment.apiUrl}/timetable/get/byteacher`, data);
            const dataValues = Object.values(response.data);
            this.convertToCalendarEvents(dataValues);
        } catch (error) {
            console.error('Error loading data', error);
        }
    }

    async onSelectSalleChange(event: any) {
        let currentWeek: string[] = [];
        currentWeek = this.getCurrentTimeDisplay();
        const data = {
            room_id: this.mapIdNomSalle.get(event.target.value)?.toString(),
            week_date_start: currentWeek[0],
            week_date_end: currentWeek[1],
        };
        try {
            let response1 = await axios.post(`${environment.apiUrl}/timetable/get/byroom`, data);
            const dataValues = Object.values(response1.data);
            this.convertToCalendarEvents(dataValues);
        } catch (error) {
            console.error('Error loading data', error);
        }
    }

    async onSelectPromoChange(event: any) {
        let currentWeek: string[] = [];
        currentWeek = this.getCurrentTimeDisplay();
        const data = {
            promotion_id: this.mapIdNomPromo.get(event.target.value)?.toString(),
            week_date_start: currentWeek[0],
            week_date_end: currentWeek[1],
        };
        try {
            let response1 = await axios.post(`${environment.apiUrl}/timetable/get/byprom`, data);
            const dataValues = Object.values(response1.data);
            this.convertToCalendarEvents(dataValues);
        } catch (error) {
            console.error('Error loading data', error);
        }
    }

    convertToCalendarEvents(dataValues: any[]): void {
        if (!dataValues || dataValues.length === 0 || !dataValues[0]) {
            console.warn('No data to convert into calendar events');
            return;
        }
        this.events = [];
        for (const course of dataValues[0]) {
            const event: CalendarEvent = {
                title: course?.teaching_title,
                start: new Date(course.starttime),
                end: new Date(course.endtime),
                draggable: true,
                resizable: {
                    beforeStart: true,
                    afterEnd: true,
                },
                cssClass: './calendar.component.css',
                meta: {
                    location: course?.room_name,
                    organizer: course?.personal_code,
                    description: course?.description,
                },
            };
            this.events.push(event);
        }
        this.refresh.next();
    }
}
