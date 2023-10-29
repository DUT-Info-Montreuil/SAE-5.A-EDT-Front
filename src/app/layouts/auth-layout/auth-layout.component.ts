import { Component } from '@angular/core';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
    selector: 'app-auth-layout',
    templateUrl: './auth-layout.component.html',
    styleUrls: ['./auth-layout.component.css'],
    animations: [trigger('authSlideTransition', [transition(':enter', [style({ transform: 'translateX(100%)' }), animate('300ms', style({ transform: 'translateX(0)' }))]), transition(':leave', [animate('300ms', style({ transform: 'translateX(100%)' }))])])],
})
export class AuthLayoutComponent {
    authState = 'enter';

    onRouteChange(direction: 'enter' | 'leave') {
        this.authState = direction;
    }

    navigateToNewRoute() {
        this.onRouteChange('leave');
    }
}
