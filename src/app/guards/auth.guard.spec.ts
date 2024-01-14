import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RoutePaths } from '../routes';

describe('AuthGuard', () => {
    let guard: AuthGuard;
    let authService: AuthService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: [AuthGuard, { provide: AuthService, useValue: { checkAuthentication: () => {}, getAuthenticationStatus: () => {} } }],
        });

        guard = TestBed.inject(AuthGuard);
        authService = TestBed.inject(AuthService);
        router = TestBed.inject(Router);
    });

    it('should be created', () => {
        expect(guard).toBeTruthy();
    });

    it('should return true for canActivate when user is authenticated', async () => {
        spyOn(authService, 'checkAuthentication');
        spyOn(authService, 'getAuthenticationStatus').and.returnValue(true);
        spyOn(router, 'navigate');

        expect(await guard.canActivate()).toBeTrue();
        expect(authService.checkAuthentication).toHaveBeenCalled();
        expect(router.navigate).not.toHaveBeenCalled();
    });

    it('should navigate to login when user is not authenticated', async () => {
        spyOn(authService, 'checkAuthentication');
        spyOn(authService, 'getAuthenticationStatus').and.returnValue(false);
        spyOn(router, 'navigate');

        expect(await guard.canActivate()).toBeFalse();
        expect(authService.checkAuthentication).toHaveBeenCalled();
        expect(router.navigate).toHaveBeenCalledWith([RoutePaths.AUTH]);
    });
});
