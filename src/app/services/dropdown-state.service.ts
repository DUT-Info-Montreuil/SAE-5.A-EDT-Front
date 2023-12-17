import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DropdownStateService {
    private isOpen = new BehaviorSubject<boolean>(false);
    public isOpen$ = this.isOpen.asObservable();

    toggleDropdown(isOpen: boolean) {
        this.isOpen.next(isOpen);
    }

    closeDropdown() {
        this.isOpen.next(false);
    }
}
