import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnChanges {
    @Input() currentPage: number = 1;
    @Input() totalPage: number = 1;
    @Input() routeName?: string;
    @Input() query: any;
    pagination: number[] = [];

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentPage'] || changes['totalPage']) {
            this.computePagination();
        }
    }

    ngOnInit() {
        this.computePagination();
    }

    computePagination() {
        this.pagination = this.paginate(this.currentPage, this.totalPage) || [];
    }

    paginate(current: number, max: number): number[] {
        if (!current || !max) return [];

        let items: number[] = [1];

        if (current === 1 && max === 1) return items;
        if (current > 4) items.push(-1);

        let r = 2,
            r1 = current - r,
            r2 = current + r;

        for (let i = r1 > 2 ? r1 : 2; i <= Math.min(max, r2); i++) items.push(i);

        if (r2 + 1 < max) items.push(-1);
        if (r2 < max) items.push(max);

        return items;
    }
}
