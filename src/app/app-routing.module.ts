import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './views/auth/login/login.component';
import { LogoutComponent } from './views/auth/logout/logout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RootComponent } from './views/root/root.component';

const routes: Routes = [
    {
        path: '',
        component: RootComponent,
    },
    {
        path: 'app',
        component: AppLayoutComponent,
        children: [
            //{ path: 'dashboard', component: DashboardComponent },
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
