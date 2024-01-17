import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription, interval } from 'rxjs';
import { RoutePaths } from 'src/app/routes';
import { AuthService } from 'src/app/services/auth.service';
import { selectSideBarCollapsed } from 'src/app/store/layout';

@Component({
    selector: 'app-app-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.css'],
})
export class AppLayoutComponent {
    public sideBarCollapsed: boolean = false;
    private sideBarCollapsedSubscription!: Subscription;
    private tokenCheckSubscription!: Subscription;

    constructor(private authService: AuthService, private router: Router, private store: Store) {
        this.tokenCheckSubscription = interval(30000).subscribe(() => {
            this.authService.checkAuthentication();
            if (!this.authService.getAuthenticationStatus()) {
                this.authService.logout();
                this.router.navigate([RoutePaths.AUTH]);
            }
        });
    }

    ngOnInit() {
        this.sideBarCollapsedSubscription = this.store.select(selectSideBarCollapsed).subscribe((isCollapsed) => {
            this.sideBarCollapsed = isCollapsed;
        });
    }

    ngOnDestroy() {
        if (this.sideBarCollapsedSubscription) {
            this.sideBarCollapsedSubscription.unsubscribe();
        }
        if (this.tokenCheckSubscription) {
            this.tokenCheckSubscription.unsubscribe();
        }
    }
}
