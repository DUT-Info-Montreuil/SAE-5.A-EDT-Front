import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import * as fromRoot from '../store/index';

@Injectable({
    providedIn: 'root',
})
export class DarkModeService {
    darkMode$ = this.store.select(fromRoot.selectDarkMode);

    constructor(private store: Store<fromRoot.LayoutState>) {}

    toggleDarkMode(): void {
        this.darkMode$.pipe(take(1)).subscribe((isDarkMode) => {
            const newDarkModeState = !isDarkMode;
            this.store.dispatch(fromRoot.setDarkMode({ darkMode: newDarkModeState }));
            if (newDarkModeState) {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        });
    }

    getDarkModeStatus(): boolean {
        let darkModeStatus: boolean;
        this.darkMode$.pipe(take(1)).subscribe((status) => (darkModeStatus = status));
        return darkModeStatus!;
    }
}
