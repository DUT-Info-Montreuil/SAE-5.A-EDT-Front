import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoutePaths } from 'src/app/routes';

@Component({
    selector: 'app-sidebar-mobile',
    templateUrl: './sidebar-mobile.component.html',
    styleUrls: ['./sidebar-mobile.component.css'],
})
export class SidebarMobileComponent {
    public routes = RoutePaths;
    public drawerOpen = false;

    constructor(private router: Router, private route: ActivatedRoute) {}

    isRouteActive(routePath: string): boolean {
        return this.router.url.startsWith(routePath);
    }

    toggleDrawer() {
        this.drawerOpen = !this.drawerOpen;
    }
}
