import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DateFormattingService } from '../../services/date-formatting.service';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { NumberSymbol } from '@angular/common';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
    @ViewChild('menu', { static: true }) menu!: ElementRef;
    formattedDate: string | null;
    scrollProgress = 0;
    scrollAmount = 0;
    reminderModalOpened: boolean = false;

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

    scrollLeft(): void {
        const maxScrollLeft = 0;
        const desiredScrollLeft = this.scrollAmount - 272;
        const menuElement = this.menu.nativeElement as HTMLElement;

        if (desiredScrollLeft < maxScrollLeft) {
            this.scrollAmount = maxScrollLeft;
        } else {
            this.scrollAmount = desiredScrollLeft;
        }

        menuElement.scrollTo({
            left: this.scrollAmount,
            behavior: 'smooth',
        });
    }

    scrollRight(): void {
        const maxScrollRight = this.menu.nativeElement.scrollWidth - this.menu.nativeElement.clientWidth;
        const desiredScrollRight = this.scrollAmount + 272;
        const menuElement = this.menu.nativeElement as HTMLElement;

        if (desiredScrollRight > maxScrollRight) {
            this.scrollAmount = maxScrollRight;
        } else {
            this.scrollAmount = desiredScrollRight;
        }

        menuElement.scrollTo({
            left: this.scrollAmount,
            behavior: 'smooth',
        });
    }

    openDeleteBankLoanModal() {
        this.reminderModalOpened = true;
    }

    closedReminderModal(reload?: boolean) {
        this.reminderModalOpened = false;
    }
}
