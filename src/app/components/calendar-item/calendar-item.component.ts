import { Component, Input } from '@angular/core';


@Component({
    selector: 'app-calendar-item',
    templateUrl: './calendar-item.component.html',
    styleUrls: ['./calendar-item.component.css'],
})
export class CalendarItemComponent {
    @Input() color: string = 'bg-calendar-purple';
    @Input() timeStart: string = 'Non renseigné';
    @Input() timeEnd: string = 'Non renseigné';
    @Input() personal: string = 'Non renseigné';
    @Input() course: string = 'Non renseigné';
    @Input() room: string = 'Non renseigné';
   
}
