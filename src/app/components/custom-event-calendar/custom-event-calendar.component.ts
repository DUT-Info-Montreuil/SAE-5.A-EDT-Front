import { Component, Input, SimpleChanges } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Course } from 'src/app/models/entities';
import { Color } from 'src/app/models/entities/Color';

@Component({
    selector: 'app-custom-event-calendar',
    templateUrl: './custom-event-calendar.component.html',
    styleUrls: ['./custom-event-calendar.component.css'],
})
export class CustomEventCalendarComponent {
    @Input()
    event!: CalendarEvent;
    course!: Course;
    color!: Color;

    getRoomCodes(): string {
        return this.course.rooms ? this.course.rooms.map((room) => room?.code).join(', ') : '';
    }

    getPersonalCodes(): string {
        return this.course.personals ? this.course.personals.map((personal) => personal?.personal_code).join(', ') : '';
    }

    getSubGroupsName(): string {
        return this.course.subgroups ? this.course.subgroups.map((subgroup) => subgroup?.name).join(', ') : '';
    }

    ngOnInit() {
        this.course = this.event?.meta as Course;
        this.color = new Color(this.course.teaching?.color!);
    }

    get customClass(): string {
        return `bg-${this.color.tailwindClass} shadow-s-${this.color.tailwindClass}`;
    }
}
