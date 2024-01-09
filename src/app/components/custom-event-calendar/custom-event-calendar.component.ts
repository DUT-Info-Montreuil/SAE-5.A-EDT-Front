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
    event?: CalendarEvent;
}
