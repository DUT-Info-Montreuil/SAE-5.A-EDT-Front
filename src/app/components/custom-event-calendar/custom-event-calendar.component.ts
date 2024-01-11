import { Component, Input } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Course } from 'src/app/models/entities';

@Component({
    selector: 'app-custom-event-calendar',
    templateUrl: './custom-event-calendar.component.html',
    styleUrls: ['./custom-event-calendar.component.css'],
})
export class CustomEventCalendarComponent {
    @Input()
    event!: CalendarEvent;
    course!: Course;

    getRoomCodes(): string {
        return this.course.rooms ? this.course.rooms.map((room) => room?.code).join(', ') : '';
    }
    getPersonalCodes(): string {
        return this.course.personals ? this.course.personals.map((personal) => personal?.personal_code).join(', ') : '';
    }

    ngOnInit() {
        this.course = this.event?.meta as Course;
    }
}
