import { registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import localeFr from '@angular/common/locales/fr';
import { Subject } from 'rxjs';
import { isSameDay } from 'date-fns';
import { TimetableService } from 'src/app/services/timetable.service';
import { FilterType } from 'src/app/models/enums';
import { Personal, Specialization, Room, Teaching, SubGroup, Course } from 'src/app/models/entities';
import { DateFormattingService } from 'src/app/services/date-formatting.service';
import { CourseService } from 'src/app/services/course.service';

registerLocaleData(localeFr, 'fr');

@Component({
    selector: 'app-gestion-calendar',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './gestion-calendar.component.html',
    styleUrls: ['./gestion-calendar.component.css'],
})
export class GestionCalendarComponent {
    private _viewDate: Date = new Date();
    view: CalendarView = CalendarView.Week;
    calendarView = CalendarView;
    excludeDays: number[] = [0, 6];
    events: CalendarEvent[] = [];
    dayStartHour: number = 8;
    dayEndHour: number = 18;
    hourSegments: number = 4;
    refresh = new Subject<void>();
    eventDetails: any = null;
    mapPersonals = new Map<string, Personal>();
    mapRooms = new Map<string, Room>();
    mapSpecializations = new Map<string, Specialization>();
    mapTeachings = new Map<string, Teaching>();
    mapSubGroups = new Map<string, SubGroup>();
    filterModalOpened: boolean = false;
    courseModalOpened: boolean = false;
    editCourseModalOpened: boolean = false;
    currentFilterType!: FilterType;
    currentFilterValue: any;
    formattedDate: string | null;
    modeEditor: boolean = false;
    alertMessage: string = '';
    alertTitle: string = '';
    courseId: string = '';

    constructor(private timetableService: TimetableService, private courseService: CourseService, private dateFormattingService: DateFormattingService, private cdr: ChangeDetectorRef) {
        this.formattedDate = this.dateFormattingService.format(new Date());
        this.initSelectFields();
    }

    get viewDate(): Date {
        return this._viewDate;
    }

    set viewDate(value: Date) {
        if (value !== this._viewDate) {
            this._viewDate = value;
            this.loadEvents();
        }
    }

    onFilterChanged(filterDetails: { filterType: FilterType; filterValue: string }) {
        this.currentFilterType = filterDetails.filterType;
        this.currentFilterValue = filterDetails.filterValue;
        this.loadEvents();
    }

    onCourseClicked(event: CalendarEvent): void {
        if (this.modeEditor) {
            this.editCourseModalOpened = true;
            this.courseId = event?.meta?.courseId;
        }
    }

    loadEvents() {
        this.timetableService.getEvents(this.currentFilterType, this.currentFilterValue, this.view, this.viewDate).then((events) => {
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

            const [teachings, subGroups] = await Promise.all([this.courseService.getTeachings(), this.courseService.getSubGroups()]);

            this.initializeSelect('selectSpecialization', specializations.data, this.mapSpecializations, FilterType.Specialization);
            this.initializeSelect('selectPersonal', personals.data, this.mapPersonals, FilterType.Personal);
            this.initializeSelect('selectRoom', rooms.data, this.mapRooms, FilterType.Room);
            this.initializeSelect('selectTeaching', teachings.data, this.mapTeachings, FilterType.Teaching);
            this.initializeSelect('selectSubGroups', subGroups.data, this.mapSubGroups, FilterType.SubGroup);
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
                return [item.personal_code, new Personal(item)];
            case FilterType.Room:
                return [item.code, new Room(item)];
            case FilterType.Specialization:
                return [item.code, new Specialization(item)];
            case FilterType.Teaching:
                return [item.title, new Teaching(item)];
            case FilterType.SubGroup:
                return [item.name, new SubGroup(item)];
            default:
                throw new Error(`Type de filtre non pris en charge: ${filterType}`);
        }
    }

    changeMode() {
        this.modeEditor = !this.modeEditor;
        this.showAlert(this.modeEditor ? 'Vous êtes passé en mode Éditeur' : 'Vous êtes passé en mode Simple', this.modeEditor ? 'Mode Editeur' : 'Mode Simple');
    }

    showAlert(message: string, title: string): void {
        this.alertMessage = message;
        this.alertTitle = title;

        setTimeout(() => {
            this.dismissAlert();
        }, 3000);
    }

    dismissAlert(): void {
        this.alertMessage = '';
        this.alertTitle = '';
        this.cdr.detectChanges();
    }

    openFilterModal() {
        this.filterModalOpened = true;
    }

    closedFilterModal(reload?: boolean) {
        this.filterModalOpened = false;
    }

    openCourseModal() {
        this.courseModalOpened = true;
    }

    closedCourseModal(reload?: boolean) {
        this.courseModalOpened = false;
        if (reload) {
            this.loadEvents();
        }
    }

    openEditCourseModal() {
        this.editCourseModalOpened = true;
    }

    closedEditCourseModal(reload?: boolean) {
        this.editCourseModalOpened = false;
        if (reload) {
            this.loadEvents();
        }
    }
}
