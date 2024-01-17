import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Role } from 'src/app/models/enums';
import { RoutePaths } from 'src/app/routes';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-sidebar-mobile',
    templateUrl: './sidebar-mobile.component.html',
    styleUrls: ['./sidebar-mobile.component.css'],
})
export class SidebarMobileComponent {
    public routes = RoutePaths;
    public drawerOpen = false;
    public userRole?: Role;
    public Role = Role;

    constructor(private router: Router, private authService: AuthService) {
        this.authService.checkAuthentication();
        this.userRole = this.authService.getUser()?.role;
    }

    isRouteActive(routePath: string): boolean {
        return this.router.url === routePath;
    }

    toggleDrawer() {
        this.drawerOpen = !this.drawerOpen;
    }
}
