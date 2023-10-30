import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
    selector: 'app-sidebar-item',
    templateUrl: './sidebar-item.component.html',
    styleUrls: ['./sidebar-item.component.css'],
})
export class SidebarItemComponent {
    @Input() label!: string;
    @Input() routePath!: string;
    @Input() active: boolean = false;
    @Input() collapse!: boolean;

    @ViewChild('menuItem') menuItem!: ElementRef;
    @ViewChild('tooltip') tooltip!: ElementRef;

    handleClick(): void {}
}
