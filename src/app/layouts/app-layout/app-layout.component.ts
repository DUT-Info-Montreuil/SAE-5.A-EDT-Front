import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectSideBarCollapsed } from 'src/app/store/layout';

@Component({
    selector: 'app-app-layout',
    templateUrl: './app-layout.component.html',
    styleUrls: ['./app-layout.component.css'],
})
export class AppLayoutComponent {
    public sideBarCollapsed: boolean = false;
    private sideBarCollapsedSubscription!: Subscription;

    constructor(private store: Store) {}

    ngOnInit() {
        this.sideBarCollapsedSubscription = this.store.select(selectSideBarCollapsed).subscribe((isCollapsed) => {
            this.sideBarCollapsed = isCollapsed;
        });
    }

    ngOnDestroy() {
        if (this.sideBarCollapsedSubscription) {
            this.sideBarCollapsedSubscription.unsubscribe();
        }
    }
}
