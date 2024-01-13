import { Injectable } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import axios from 'axios';
import { format, startOfWeek, endOfWeek, startOfDay, endOfDay } from 'date-fns';
import { environment } from 'src/environments/environment';
import { Course, User } from '../models/entities';
import { FilterType } from '../models/enums';
import { Subject } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root',
})
export class TimetableService {
    public refresh = new Subject<void>();

    constructor(private authService: AuthService) {}

    getCurrentTimeDisplay(viewDate: Date): string[] {
        return [format(startOfWeek(viewDate), 'yyyy-MM-dd'), format(endOfWeek(viewDate), 'yyyy-MM-dd')];
    }

    async getEventsByUser(user: User, viewDate: Date): Promise<CalendarEvent[]> {
        const currentWeek = this.getCurrentTimeDisplay(viewDate);

        try {
            this.authService.checkAuthentication();
            const token = this.authService.getToken();
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const data = { username: user?.username, week_date_start: currentWeek[0], week_date_end: currentWeek[1] };
            const response = await axios.post(`${environment.apiUrl}/courses/timetable/by-student`, data, { headers });
            return this.convertToCalendarEvents(Object.values(response.data));
        } catch (error) {
            console.error('Error loading data', error);
            return [];
        }
    }

    async getEvents(filterType: FilterType, filterValue: any, viewDate: Date): Promise<CalendarEvent[]> {
        if (!filterType || !filterValue) {
            return [];
        }

        const currentWeek = this.getCurrentTimeDisplay(viewDate);
        let apiEndpoint = '';
        let data = {};

        switch (filterType) {
            case FilterType.Personal:
                apiEndpoint = `${environment.apiUrl}/courses/timetable/by-teacher`;
                data = { personal_id: filterValue?.id, week_date_start: currentWeek[0], week_date_end: currentWeek[1] };
                break;
            case FilterType.Room:
                apiEndpoint = `${environment.apiUrl}/courses/timetable/by-room`;
                data = { room_id: filterValue?.id, week_date_start: currentWeek[0], week_date_end: currentWeek[1] };
                break;
            case FilterType.Specialization:
                apiEndpoint = `${environment.apiUrl}/courses/timetable/by-department-and-promotion`;
                data = { promotion: filterValue?.id, department_id: filterValue?.department_id, week_date_start: currentWeek[0], week_date_end: currentWeek[1] };
                break;
        }

        try {
            this.authService.checkAuthentication();
            const token = this.authService.getToken();
            const headers = token ? { Authorization: `Bearer ${token}` } : {};
            const response = await axios.post(apiEndpoint, data, { headers });
            return this.convertToCalendarEvents(Object.values(response.data));
        } catch (error) {
            console.error('Error loading data', error);
            return [];
        }
    }

    convertToCalendarEvents(dataValues: any[]): CalendarEvent[] {
        return dataValues[0].map((course: Course) => ({
            title: course?.teaching?.title,
            start: new Date(course.starttime),
            end: new Date(course.endtime),
            draggable: false,
            resizable: {
                beforeStart: false,
                afterEnd: false,
            },
            cssClass: './calendar.component.css',
            meta: course,
        }));
    }

    async getSpecializations() {
        this.authService.checkAuthentication();
        const token = this.authService.getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        return await axios.get(`${environment.apiUrl}/specializations/get`, { headers });
    }

    async getPersonals() {
        this.authService.checkAuthentication();
        const token = this.authService.getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        return await axios.get(`${environment.apiUrl}/personals/get`, { headers });
    }

    async getRooms() {
        this.authService.checkAuthentication();
        const token = this.authService.getToken();
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        return await axios.get(`${environment.apiUrl}/rooms/get`, { headers });
    }
}
