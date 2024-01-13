import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { DateFormattingService } from '../../services/date-formatting.service';
import { AuthService } from 'src/app/services/auth.service';
import { NumberSymbol } from '@angular/common';
import { Course, User } from 'src/app/models/entities';
import { TimetableService } from 'src/app/services/timetable.service';
import { Subject } from 'rxjs';

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
    user?: User;
    courses?: Course[];
    refresh = new Subject<void>();

    constructor(private dateFormattingService: DateFormattingService, private authService: AuthService, private timetableService: TimetableService) {
        this.formattedDate = this.dateFormattingService.format(new Date());
    }

    ngOnInit(): void {
        this.user = this.authService.getUser()!;
        this.loadEventsUser();
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

    loadEventsUser() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        this.timetableService.getEventsByUser(this.user!, today).then((events) => {
            if (events) {
                this.courses = events
                    .filter((event) => {
                        const eventDate = event.start;
                        eventDate.setHours(0, 0, 0, 0);
                        return eventDate.getTime() === today.getTime();
                    })
                    .map((event) => event.meta as Course);
            }
            this.refresh.next();
        });
    }

    openReminderModal() {
        this.reminderModalOpened = true;
    }

    closedReminderModal(reload?: boolean) {
        this.reminderModalOpened = false;
    }
}
