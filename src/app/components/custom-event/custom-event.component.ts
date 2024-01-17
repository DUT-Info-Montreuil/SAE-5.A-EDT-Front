import { Component, Input } from '@angular/core';
import { Course } from 'src/app/models/entities';
import { Color } from 'src/app/models/entities/Color';

@Component({
    selector: 'app-custom-event',
    templateUrl: './custom-event.component.html',
    styleUrls: ['./custom-event.component.css'],
})
export class CustomEventComponent {
    @Input()
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
        this.color = new Color(this.course.teaching?.color!);
    }

    get customClass(): string {
        return `bg-${this.color.tailwindClass} shadow-s-${this.color.tailwindClass}`;
    }

    formatTime(dateTime: string): string {
        return dateTime.split('T')[1];
    }
}
