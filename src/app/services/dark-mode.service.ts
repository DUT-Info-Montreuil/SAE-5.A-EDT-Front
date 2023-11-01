import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DarkModeService {
    private isDarkMode = false;

    toggleDarkMode(): void {
        this.isDarkMode = !this.isDarkMode;
        if (this.isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    getDarkModeStatus(): boolean {
        return this.isDarkMode;
    }
}
