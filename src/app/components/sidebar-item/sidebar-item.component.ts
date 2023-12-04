import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TooltipOptions, Tooltip } from 'flowbite';

@Component({
    selector: 'app-sidebar-item',
    templateUrl: './sidebar-item.component.html',
    styleUrls: ['./sidebar-item.component.css'],
})
export class SidebarItemComponent implements AfterViewInit {
    @Input() label!: string;
    @Input() routePath!: string;
    @Input() active: boolean = false;
    @Input() collapse!: boolean;

    @ViewChild('tooltip') tooltipElement!: ElementRef;
    @ViewChild('menuItem') menuItemElement!: ElementRef;

    ngAfterViewInit() {
        if (this.tooltipElement && this.menuItemElement) {
            const options: TooltipOptions = {
                placement: 'right',
                triggerType: 'hover',
            };
            new Tooltip(this.tooltipElement.nativeElement, this.menuItemElement.nativeElement, options);
        }
    }
}
