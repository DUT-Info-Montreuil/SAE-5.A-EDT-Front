import { Injectable } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import axios from 'axios';
import { format, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';
import { environment } from 'src/environments/environment';
import { Course } from '../models/entities';
import { FilterType } from '../models/enums';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TimetableService {
    public refresh = new Subject<void>();

    constructor() {}

    getCurrentTimeDisplay(viewDate: Date): string[] {
        return [format(startOfWeek(viewDate), 'yyyy-MM-dd'), format(endOfWeek(viewDate), 'yyyy-MM-dd')];
    }

    async getEvents(filterType: FilterType, filterValue: any, view: CalendarView, viewDate: Date): Promise<CalendarEvent[]> {
        if (!filterType || !filterValue) {
            return [];
        }

        const currentWeek = this.getCurrentTimeDisplay(viewDate);
        let apiEndpoint = '';
        let data = {};

        switch (filterType) {
            case FilterType.Teacher:
                apiEndpoint = `${environment.apiUrl}/timetable/get/byteacher`;
                data = { personnal_id: filterValue?.id, week_date_start: currentWeek[0], week_date_end: currentWeek[1] };
                break;
            case FilterType.Room:
                apiEndpoint = `${environment.apiUrl}/timetable/get/byroom`;
                data = { room_id: filterValue?.id, week_date_start: currentWeek[0], week_date_end: currentWeek[1] };
                break;
            case FilterType.Specialization:
                apiEndpoint = `${environment.apiUrl}/timetable/get/byprom`;
                data = { promotion_id: filterValue?.id, department_id: filterValue?.department_id, week_date_start: currentWeek[0], week_date_end: currentWeek[1] };
                break;
        }

        try {
            const response = await axios.post(apiEndpoint, data);
            return this.convertToCalendarEvents(Object.values(response.data));
        } catch (error) {
            console.error('Error loading data', error);
            return [];
        }
    }

    convertToCalendarEvents(dataValues: any[]): CalendarEvent[] {
        return dataValues[0].map((course: Course) => ({
            title: course?.teaching_title,
            start: new Date(course.starttime),
            end: new Date(course.endtime),
            draggable: false,
            resizable: {
                beforeStart: false,
                afterEnd: false,
            },
            cssClass: './calendar.component.css',
            meta: {
                location: course?.room_name,
                organizer: course?.personal_code,
                description: course?.description,
            },
        }));
    }

    async getSpecializations() {
        return await axios.get(`${environment.apiUrl}/specializations/get`);
    }

    async getPersonals() {
        return await axios.get(`${environment.apiUrl}/personals/get`);
    }

    async getRooms() {
        return await axios.get(`${environment.apiUrl}/rooms/get`);
    }
}
