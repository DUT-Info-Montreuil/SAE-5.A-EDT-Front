import { Component, ElementRef, Input, AfterViewInit, ViewChild } from '@angular/core';
import { Tooltip, TooltipOptions } from 'flowbite';

@Component({
    selector: 'app-event-card',
    templateUrl: './event-card.component.html',
    styleUrls: ['./event-card.component.css'],
})
export class EventCardComponent implements AfterViewInit {
    @Input() label?: string;
    @Input() date?: string;
    @Input() time?: string;
    @Input() background: string = 'bg-subtitle';
    @Input() warn: boolean = false;
    @Input() success: boolean = false;
    @ViewChild('tooltip') tooltipElement!: ElementRef;
    @ViewChild('item') itemElement!: ElementRef;

    ngAfterViewInit() {
        if (this.tooltipElement && this.itemElement) {
            const options: TooltipOptions = {
                placement: 'right',
                triggerType: 'hover',
            };
            new Tooltip(this.tooltipElement.nativeElement, this.itemElement.nativeElement, options);
        }
    }
}
