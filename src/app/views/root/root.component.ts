import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoutePaths } from '../../routes';
import { Store, select } from '@ngrx/store';
import * as fromRoot from '../../store/index';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.css'],
})
export class RootComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router, private store: Store<fromRoot.LayoutState>) {}

    ngOnInit(): void {
        this.store.pipe(select(fromRoot.selectDarkMode)).subscribe((darkMode) => {
            if (darkMode) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });

        if (this.authService.isAuthenticated) {
            this.router.navigate([RoutePaths.APP]);
        } else {
            this.router.navigate([RoutePaths.AUTH]);
        }
    }
}
