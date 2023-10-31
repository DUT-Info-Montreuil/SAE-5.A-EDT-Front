import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { StoreModule } from '@ngrx/store';
import { layoutReducer } from './store/layout';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { GestionComponent } from './views/gestion/gestion.component';
import { SidebarMobileComponent } from './components/sidebar-mobile/sidebar-mobile.component';

@NgModule({
    declarations: [AuthLayoutComponent, AppLayoutComponent, LoginComponent, LogoutComponent, ButtonComponent, RootComponent, LabeledIconInputComponent, SidebarComponent, SidebarItemComponent, DashboardComponent, CalendarComponent, GestionComponent, SidebarMobileComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule, StoreModule.forRoot({ layout: layoutReducer })],
    providers: [],
    bootstrap: [RootComponent],
})
export class AppModule {}
