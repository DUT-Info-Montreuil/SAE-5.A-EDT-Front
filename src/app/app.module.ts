import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { LoginComponent } from './views/auth/login/login.component';
import { LogoutComponent } from './views/auth/logout/logout.component';
import { ButtonComponent } from './components/button/button.component';
import { RootComponent } from './views/root/root.component';
import { LabeledIconInputComponent } from './components/labeled-icon-input/labeled-icon-input.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { layoutReducer } from './store/layout';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { GestionComponent } from './views/gestion/gestion.component';
import { SidebarMobileComponent } from './components/sidebar-mobile/sidebar-mobile.component';
import { ThemeToggleButtonComponent } from './components/theme-toggle-button/theme-toggle-button.component';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { DatePipe } from '@angular/common';
import { ClickOutsideModule } from 'ng-click-outside';
import localeFr from '@angular/common/locales/fr';
import { CustomEventComponent } from './components/custom-event/custom-event.component';
import { DragToScrollDirective } from './directives/drag-to-scroll.directive';
import { EventCardComponent } from './components/event-card/event-card.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SettingsComponent } from './views/settings/settings.component';
import { LabelFieldComponent } from './components/label-field/label-field.component';
import { ModalComponent } from './components/modals/modal/modal.component';
import { CreateReminderModalComponent } from './components/modals/create-reminder-modal/create-reminder-modal.component';
import { EditReminderModalComponent } from './components/modals/edit-reminder-modal/edit-reminder-modal.component';
import { LabeledDateInputComponent } from './components/labeled-date-input/labeled-date-input.component';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ModalCreateClassesComponent } from './components/modals/modal-create-classes/modal-create-classes.component';
import { userReducer } from './store/user';
import { AlertComponent } from './components/alert/alert.component';
import { GestionAdminComponent } from './views/gestion-admin/gestion-admin.component';
import { AddEleveModalComponent } from './components/modals/add-eleve-modal/add-eleve-modal.component';
import { DeleteEleveModalComponent } from './components/modals/delete-eleve-modal/delete-eleve-modal.component';
import { UpdateEleveModalComponent } from './components/modals/update-eleve-modal/update-eleve-modal.component';
import { FilterModalComponent } from './components/modals/filter-modal/filter-modal.component';
import { CustomEventCalendarComponent } from './components/custom-event-calendar/custom-event-calendar.component';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { GestionCalendarComponent } from './views/gestion-calendar/gestion-calendar.component';
import { CourseModalComponent } from './components/modals/course-modal/course-modal.component';
import { SidebarToggleItemComponent } from './components/sidebar-toggle-item/sidebar-toggle-item.component';
import { LabeledTimeInputComponent } from './components/labeled-time-input/labeled-time-input.component';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { EditCourseModalComponent } from './components/modals/edit-course-modal/edit-course-modal.component';
import { UpdateProfModalComponent } from './components/modals/update-prof-modal/update-prof-modal.component';
import { UpdateSalleModalComponent } from './components/modals/update-salle-modal/update-salle-modal.component';
import { UpdateRessourceModalComponent } from './components/modals/update-ressource-modal/update-ressource-modal.component';
import { AddCohorteModalComponent } from './components/modals/add-cohorte-modal/add-cohorte-modal.component';

export function localStorageSyncReducer(reducer: any): any {
    return localStorageSync({ keys: ['layout', 'user'], rehydrate: true })(reducer);
}

const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
registerLocaleData(localeFr);

class CustomDateFormatter extends CalendarNativeDateFormatter {
    public override dayViewHour({ date, locale }: DateFormatterParams): string {
        return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(date);
    }
    public override weekViewHour({ date, locale }: DateFormatterParams): string {
        return new Intl.DateTimeFormat(locale, { hour: 'numeric', minute: 'numeric' }).format(date);
    }
}

@NgModule({
    declarations: [
        AuthLayoutComponent,
        AppLayoutComponent,
        LoginComponent,
        LogoutComponent,
        ButtonComponent,
        RootComponent,
        LabeledIconInputComponent,
        SidebarComponent,
        SidebarItemComponent,
        DashboardComponent,
        CalendarComponent,
        GestionComponent,
        SidebarMobileComponent,
        ThemeToggleButtonComponent,
        CustomEventComponent,
        DragToScrollDirective,
        EventCardComponent,
        PaginationComponent,
        SettingsComponent,
        LabelFieldComponent,
        ModalComponent,
        CreateReminderModalComponent,
        EditReminderModalComponent,
        LabeledDateInputComponent,
        AlertComponent,
        GestionAdminComponent,
        AddEleveModalComponent,
        DeleteEleveModalComponent,
        UpdateEleveModalComponent,
        FilterModalComponent,
        CustomEventCalendarComponent,
        SearchInputComponent,
        UpdateProfModalComponent,
        UpdateSalleModalComponent,
        UpdateRessourceModalComponent,
        AddCohorteModalComponent,
        GestionCalendarComponent,
        CourseModalComponent,
        SidebarToggleItemComponent,
        LabeledTimeInputComponent,
        DropdownComponent,
        EditCourseModalComponent,
    ],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, ClickOutsideModule, FormsModule, ReactiveFormsModule, StoreModule.forRoot({ layout: layoutReducer, user: userReducer }, { metaReducers }), CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })],
    providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, DatePipe, { provide: CalendarDateFormatter, useClass: CustomDateFormatter }],
    bootstrap: [RootComponent],
})
export class AppModule {}
