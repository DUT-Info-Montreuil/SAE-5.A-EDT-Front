import { Component, ElementRef, ViewChild } from '@angular/core';
import { DateFormattingService } from 'src/app/services/date-formatting.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
    formattedDate: string | null;
    @ViewChild('menu', { static: true })
    menu!: ElementRef;
    scrollProgress = 0;

    constructor(private dateFormattingService: DateFormattingService) {
        this.formattedDate = this.dateFormattingService.format(new Date());
    }

    updateProgressBar(): void {
        const menuElement = this.menu.nativeElement as HTMLElement;
        const scrollableWidth = menuElement.scrollWidth - menuElement.clientWidth;
        const scrollPosition = menuElement.scrollLeft;

        if (scrollableWidth > 0) {
            this.scrollProgress = (scrollPosition / scrollableWidth) * 75;
        } else {
            this.scrollProgress = 0;
        }
    }
}
