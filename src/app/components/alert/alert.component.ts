import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AlertColor } from '../../models/enums';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
    animations: [trigger('fadeInOut', [transition(':enter', [style({ opacity: 0 }), animate('300ms ease-in-out', style({ opacity: 1 }))]), transition(':leave', [animate('300ms ease-in-out', style({ opacity: 0 }))])])],
})
export class AlertComponent {
    @Input() title?: string;
    @Input() message?: string;
    @Input() closable = true;
    @Input() color?: string;
    @Output() close = new EventEmitter<void>();
    alertColor = AlertColor;
    commonIconClass = 'rounded-full h-12 w-12 flex items-center justify-center';

    dismiss(): void {
        this.close.emit();
    }
}
