import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoutePaths } from '../routes';
import { Role } from '../models/enums';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) {}

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        await this.authService.checkAuthentication();
        if (this.authService.getAuthenticationStatus()) {
            const requiredRoles = route.data['requiredRoles'] as Role[];
            const userRole = this.authService.getUser()?.role;
            if (requiredRoles && !requiredRoles.includes(userRole!)) {
                this.router.navigate([RoutePaths.APP]);
                return false;
            }
            return true;
        } else {
            this.router.navigate([RoutePaths.AUTH]);
            return false;
        }
    }
}
