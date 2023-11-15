import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent {
    @Input() label?: string;
    @Input() date?: string;
    @Input() time?: string;
    @Input() background: string = 'bg-subtitle';
}
