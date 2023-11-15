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
import localeFr from '@angular/common/locales/fr';
import { CalendarItemComponent } from './components/calendar-item/calendar-item.component';
import { DragToScrollDirective } from './directives/drag-to-scroll.directive';
import { EventCardComponent } from './components/event-card/event-card.component';
import { PaginationComponent } from './components/pagination/pagination.component';

export function localStorageSyncReducer(reducer: any): any {
    return localStorageSync({ keys: ['layout'], rehydrate: true })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
registerLocaleData(localeFr);

@NgModule({
    declarations: [AuthLayoutComponent, AppLayoutComponent, LoginComponent, LogoutComponent, ButtonComponent, RootComponent, LabeledIconInputComponent, SidebarComponent, SidebarItemComponent, DashboardComponent, CalendarComponent, GestionComponent, SidebarMobileComponent, ThemeToggleButtonComponent, CalendarItemComponent, DragToScrollDirective, EventCardComponent, PaginationComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, StoreModule.forRoot({ layout: layoutReducer }, { metaReducers })],
    providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, DatePipe],
    bootstrap: [RootComponent],
})
export class AppModule {}
