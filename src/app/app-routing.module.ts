import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { LogoutComponent } from './views/auth/logout/logout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RootComponent } from './views/root/root.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { CalendarComponent } from './views/calendar/calendar.component';
import { GestionComponent } from './views/gestion/gestion.component';
import { SettingsComponent } from './views/settings/settings.component';
import { GestionCalendarComponent } from './views/gestion-calendar/gestion-calendar.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: RootComponent,
    },
    {
        path: 'app',
        component: AppLayoutComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
            { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
            { path: 'calendar', component: CalendarComponent, canActivate: [AuthGuard] },
            { path: 'gestion', component: GestionComponent, canActivate: [AuthGuard] },
            { path: 'gestion-calendar', component: GestionCalendarComponent, canActivate: [AuthGuard] },
            { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },

            // ici on mettra les autres routes de l'application
        ],
    },
    {
        path: 'auth',
        component: AuthLayoutComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'login' },
            { path: 'login', component: LoginComponent, data: { animation: 'loginPage' } },
            { path: 'logout', component: LogoutComponent },
            // ici on mettra les autres routes d'authentification si nécessaire
        ],
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
