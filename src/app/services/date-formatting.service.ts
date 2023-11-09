import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class DateFormattingService {
    constructor(private datePipe: DatePipe) {}

    format(date: Date = new Date(), pattern: string = 'dd MMM yyyy, EEEE'): string | null {
        return this.datePipe.transform(date, pattern, 'UTC', 'fr-FR');
    }
}
