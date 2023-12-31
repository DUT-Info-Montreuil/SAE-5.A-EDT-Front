import { trigger, transition, style, animate } from '@angular/animations';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css'],
    animations: [
        trigger('fadeInOut', [transition(':enter', [style({ opacity: 0 }), animate('300ms ease-out', style({ opacity: 1 }))]), transition(':leave', [animate('200ms ease-in', style({ opacity: 0 }))])]),
        trigger('scaleInOut', [transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]), transition(':leave', [animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))])]),
    ],
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() isOpen = false;
    @Input() padding: string = 'p-4';
    @Input() maxWidth: string = 'max-w-lg';
    @Input() height: string = 'h-full';
    @Input() rounded: string = 'rounded-xl';
    @Output() closed = new EventEmitter<boolean>();

    constructor() {}

    ngOnInit(): void {}

    ngOnDestroy(): void {}

    close(reload: boolean = false): void {
        console.log('test');
        this.closed.emit(reload);
        this.isOpen = false;
    }
}
