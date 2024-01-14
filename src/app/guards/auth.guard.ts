import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutePaths } from '../routes';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(): Promise<boolean> {
        await this.authService.checkAuthentication();
        if (this.authService.getAuthenticationStatus()) {
            return true;
        } else {
            this.router.navigate([RoutePaths.AUTH]);
            return false;
        }
    }
}
