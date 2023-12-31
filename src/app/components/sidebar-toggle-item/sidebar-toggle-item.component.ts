import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-sidebar-toggle-item',
    templateUrl: './sidebar-toggle-item.component.html',
    styleUrls: ['./sidebar-toggle-item.component.css'],
    animations: [trigger('rotateIcon', [state('closed', style({ transform: 'rotate(0)' })), state('open', style({ transform: 'rotate(180deg)' })), transition('closed <=> open', animate('300ms ease-out'))]), trigger('expandCollapse', [state('open', style({ height: '*', opacity: 1 })), state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden' })), transition('open <=> closed', animate('200ms ease-out'))])],
})
export class SidebarToggleItemComponent {
    @Input() label!: string;
    @Input() collapse!: boolean;
    isOpen = true;

    toggle() {
        this.isOpen = !this.isOpen;
    }
}
