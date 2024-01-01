import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Personal, Specialization, Room } from 'src/app/models/entities';
import { FilterType } from 'src/app/models/enums';

@Component({
    selector: 'app-filter-modal',
    templateUrl: './filter-modal.component.html',
    styleUrls: ['./filter-modal.component.css'],
})
export class FilterModalComponent {
    @Input() isOpen!: boolean;
    @Input() mapPersonals!: Map<string, Personal>;
    @Input() mapRooms!: Map<string, Room>;
    @Input() mapSpecializations!: Map<string, Specialization>;
    @Output() closed = new EventEmitter<boolean>();
    @Output() filterChanged = new EventEmitter<{ filterType: FilterType; filterValue: any }>();
    FilterType = FilterType;
    isLoading: boolean = false;
    filterValue!: Personal | Room | Specialization;
    filterType?: FilterType;
    searchText: string = '';
    filteredSpecializations: Array<{ key: string; value: Specialization }> = [];
    filteredPersonals: Array<{ key: string; value: Personal }> = [];
    filteredRooms: Array<{ key: string; value: Room }> = [];
    numberOfResults: number = 0;

    constructor() {}

    ngOnInit() {
        this.initFilter();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['isOpen'].currentValue === true) {
            this.onSearchChange(this.searchText);
        }
    }

    initFilter() {
        this.filterType = FilterType.Specialization;
        this.filterValue = new Specialization({
            code: 'INFO',
            department_id: '1',
            id: '1', //Todo à gerer au moment de la connexion

            name: 'Semestre de preparation au parcours',
        });
        this.filterChanged.emit({ filterType: this.filterType, filterValue: this.filterValue });
    }

    setActiveFilterType(filterType: FilterType) {
        this.filterType = filterType;
        this.updateNumberOfResults();
    }

    onSearchChange(searchText: string): void {
        this.searchText = searchText.toLowerCase();
        this.filteredSpecializations = this.filterMap(this.mapSpecializations, this.searchText);
        this.filteredPersonals = this.filterMap(this.mapPersonals, this.searchText);
        this.filteredRooms = this.filterMap(this.mapRooms, this.searchText);

        this.updateNumberOfResults();
    }

    private filterMap<T>(map: Map<string, T>, searchText: string): Array<{ key: string; value: T }> {
        const filtered = Array.from(map)
            .filter(([key, value]) => !searchText || key.toLowerCase().includes(searchText))
            .map(([key, value]) => ({ key, value }));
        return filtered;
    }

    isSelectedFilter(type: FilterType, value: any): boolean {
        return this.filterType === type && this.filterValue === value;
    }

    selectFilter(type: FilterType, value: Personal | Specialization | Room) {
        this.filterType = type;
        this.filterValue = value;
    }

    updateNumberOfResults(): void {
        switch (this.filterType) {
            case FilterType.Specialization:
                this.numberOfResults = this.filteredSpecializations.length;
                break;
            case FilterType.Room:
                this.numberOfResults = this.filteredRooms.length;
                break;
            case FilterType.Personal:
                this.numberOfResults = this.filteredPersonals.length;
                break;
            default:
                this.numberOfResults = 0;
        }
    }

    submit() {
        this.filterChanged.emit({ filterType: this.filterType!, filterValue: this.filterValue });
        this.close(true);
    }

    close(reload: boolean = false): void {
        this.closed.emit(reload);
        this.isOpen = false;
    }
}
