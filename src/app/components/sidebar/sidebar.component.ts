import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { RoutePaths } from 'src/app/routes';
import { selectOverflowYHidden, selectSideBarCollapsed, setSideBarCollapsed } from 'src/app/store/layout';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
    animations: [
        trigger('textAnimation', [
            state(
                'collapsed',
                style({
                    opacity: 0,
                    transform: 'translateX(-100%)',
                })
            ),
            state(
                'expanded',
                style({
                    opacity: 1,
                    transform: 'translateX(0)',
                })
            ),
            transition('collapsed <=> expanded', [animate('100ms ease-out')]),
        ]),
    ],
})
export class SidebarComponent {
    public routes = RoutePaths;
    public sideBarCollapsed: boolean = false;
    public overflowYHidden: boolean = false;

    private sidebarCollapsedSubscription!: Subscription;
    private overflowYHiddenSubscription!: Subscription;

    constructor(private store: Store, private router: Router, private route: ActivatedRoute) {}

    ngOnInit() {
        this.sidebarCollapsedSubscription = this.store.select(selectSideBarCollapsed).subscribe((value) => {
            this.sideBarCollapsed = value;
        });
        this.overflowYHiddenSubscription = this.store.select(selectOverflowYHidden).subscribe((value) => {
            this.overflowYHidden = value;
        });
    }

    ngOnDestroy() {
        this.sidebarCollapsedSubscription.unsubscribe();
        this.overflowYHiddenSubscription.unsubscribe();
    }

    toggleSidebar() {
        this.store.dispatch(setSideBarCollapsed(!this.sideBarCollapsed));
    }

    isRouteActive(routePath: string): boolean {
        return this.router.url.startsWith(routePath);
    }
}
