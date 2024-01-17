import { Component } from '@angular/core';
import { DarkModeService } from 'src/app/services/dark-mode.service';

@Component({
    selector: 'app-theme-toggle-button',
    templateUrl: './theme-toggle-button.component.html',
    styleUrls: ['./theme-toggle-button.component.css'],
})
export class ThemeToggleButtonComponent {
    constructor(private darkModeService: DarkModeService) {}

    toggleDarkMode(): void {
        this.darkModeService.toggleDarkMode();
    }

    get darkMode(): boolean {
        return this.darkModeService.getDarkModeStatus();
    }
}
