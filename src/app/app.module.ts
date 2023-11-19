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
import { CalendarViewComponent } from './views/calendar-view/calendar-view.component';
import { GestionComponent } from './views/gestion/gestion.component';
import { SidebarMobileComponent } from './components/sidebar-mobile/sidebar-mobile.component';
import { ThemeToggleButtonComponent } from './components/theme-toggle-button/theme-toggle-button.component';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import { DatePipe } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { CalendarItemComponent } from './components/calendar-item/calendar-item.component';
import { DragToScrollDirective } from './directives/drag-to-scroll.directive';
import { EventCardComponent } from './components/event-card/event-card.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { SettingsComponent } from './views/settings/settings.component';
import { LabelFieldComponent } from './components/label-field/label-field.component';
import { CalendarDateFormatter, CalendarModule, CalendarNativeDateFormatter, DateAdapter, DateFormatterParams } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CalendarComponent } from './components/calendar/calendar.component';

export function localStorageSyncReducer(reducer: any): any {
    return localStorageSync({ keys: ['layout'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
registerLocaleData(localeFr);

class CustomDateFormatter extends CalendarNativeDateFormatter {
    public override dayViewHour({ date, locale }: DateFormatterParams): string {
      return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: 'numeric'}).format(date);
    }
    public override weekViewHour({ date, locale }: DateFormatterParams): string {
      return new Intl.DateTimeFormat(locale, {hour: 'numeric', minute: 'numeric'}).format(date);
    }
  }
  
@NgModule({
    declarations: [AuthLayoutComponent, AppLayoutComponent, LoginComponent, LogoutComponent, ButtonComponent, RootComponent, LabeledIconInputComponent, SidebarComponent, SidebarItemComponent, DashboardComponent, CalendarViewComponent, GestionComponent, SidebarMobileComponent, ThemeToggleButtonComponent, CalendarItemComponent, DragToScrollDirective, EventCardComponent, PaginationComponent, SettingsComponent, LabelFieldComponent, CalendarComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, StoreModule.forRoot({ layout: layoutReducer }, { metaReducers }), CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })],
    providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, DatePipe, {provide: CalendarDateFormatter,useClass: CustomDateFormatter}],
    bootstrap: [RootComponent],
})
export class AppModule {}
