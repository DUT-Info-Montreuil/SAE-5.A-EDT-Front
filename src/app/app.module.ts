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

@NgModule({
    declarations: [AuthLayoutComponent, AppLayoutComponent, LoginComponent, LogoutComponent, ButtonComponent, RootComponent, LabeledIconInputComponent],
    imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, FormsModule, ReactiveFormsModule],
    providers: [],
    bootstrap: [RootComponent],
})
export class AppModule {}
