import { registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import localeFr from '@angular/common/locales/fr';
import { Subject } from 'rxjs';
import { isSameDay } from 'date-fns';
import { TimetableService } from 'src/app/services/timetable.service';
import { FilterType } from 'src/app/models/enums';
import { Specialization, Room, Personal, User } from 'src/app/models/entities';
import { DateFormattingService } from 'src/app/services/date-formatting.service';
import { AuthService } from 'src/app/services/auth.service';

registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'app-calendar',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
    private _viewDate: Date = new Date();
    view: CalendarView = CalendarView.Week;
    calendarView = CalendarView;
    excludeDays: number[] = [0, 6];
    events: CalendarEvent[] = [];
    dayStartHour: number = 8;
    dayEndHour: number = 18;
    hourSegments: number = 4;
    isCreationModalOpen: boolean = false;
    refresh = new Subject<void>();
    eventDetails: any = null;
    mapPersonals = new Map<string, Personal>();
    mapRooms = new Map<string, Room>();
    mapSpecializations = new Map<string, Specialization>();
    filterModalOpened: boolean = false;
    currentFilterType!: FilterType;
    currentFilterValue: any;
    formattedDate: string | null;
    user?: User;

    constructor(private authService: AuthService, private timetableService: TimetableService, private dateFormattingService: DateFormattingService) {
        this.formattedDate = this.dateFormattingService.format(new Date());
        this.initSelectFields();
    }

    ngOnInit(): void {
        this.user = this.authService.getUser()!;
        this.loadEventsUser();
    }

    get viewDate(): Date {
        return this._viewDate;
    }

    set viewDate(value: Date) {
        if (value !== this._viewDate) {
            this._viewDate = value;
            if (this.currentFilterType && this.currentFilterValue) {
                this.loadEvents();
            } else {
                this.loadEventsUser();
            }
        }
    }

    onFilterChanged(filterDetails: { filterType: FilterType; filterValue: string }) {
        this.currentFilterType = filterDetails?.filterType;
        this.currentFilterValue = filterDetails?.filterValue;
        if (this.currentFilterType && this.currentFilterValue) {
            this.loadEvents();
        } else {
            this.loadEventsUser();
        }
    }

    loadEventsUser() {
        this.timetableService.getEventsByUser(this.user!, this.viewDate).then((events) => {
            this.events = events;
            this.refresh.next();
        });
    }

    loadEvents() {
        this.timetableService.getEvents(this.currentFilterType, this.currentFilterValue, this.viewDate).then((events) => {
            this.events = events;
            this.refresh.next();
        });
    }

    setView(view: CalendarView) {
        this.view = view;
    }

    dayViewClick() {
        this.setView(this.calendarView.Week);
    }

    changeDay(date: Date) {
        this.viewDate = date;
        this.view = CalendarView.Day;
    }

    isToday(date: Date): boolean {
        return isSameDay(date, new Date());
    }

    showEventDetails(event: any) {
        this.eventDetails = event;
    }
    closeEventDetails() {
        this.eventDetails = null;
    }

    private async initSelectFields() {
        try {
            const [specializations, personals, rooms] = await Promise.all([this.timetableService.getSpecializations(), this.timetableService.getPersonals(), this.timetableService.getRooms()]);

            this.initializeSelect('selectPromo', specializations.data, this.mapSpecializations, FilterType.Specialization);
            this.initializeSelect('selectProf', personals.data, this.mapPersonals, FilterType.Personal);
            this.initializeSelect('selectSalle', rooms.data, this.mapRooms, FilterType.Room);
        } catch (error) {
            console.error('Error loading select field data:', error);
        }
    }

    private initializeSelect(elementId: string, data: any[], map: Map<string, any>, filterType: FilterType) {
        const selectElement = document.querySelector(`.${elementId}`);
        data.forEach((item) => {
            const [key, value] = this.extractKeyAndValue(item, filterType);
            map.set(key, value);
            const option = document.createElement('option');
            option.value = value;
            option.text = key;
            selectElement?.appendChild(option);
        });
    }

    private extractKeyAndValue(item: any, filterType: FilterType): [string, any] {
        switch (filterType) {
            case FilterType.Personal:
                return [item.id, new Personal(item)];
            case FilterType.Room:
                return [item.id, new Room(item)];
            case FilterType.Specialization:
                return [item.id, new Specialization(item)];
            default:
                throw new Error(`Type de filtre non pris en charge: ${filterType}`);
        }
    }

    openFilterModal() {
        this.filterModalOpened = true;
    }

    closedFilterModal(reload?: boolean) {
        this.filterModalOpened = false;
    }
}
