import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RoutePaths } from '../../routes';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.css'],
})
export class RootComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        if (this.authService.isAuthenticated) {
            this.router.navigate([RoutePaths.APP]);
        } else {
            this.router.navigate([RoutePaths.AUTH]);
        }
    }
}
