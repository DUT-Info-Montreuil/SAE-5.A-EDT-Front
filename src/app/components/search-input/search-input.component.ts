import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.css'],
})
export class SearchInputComponent {
    @Input() label!: string;
    @Input() placeholder: string = '';
    @Input() hasAction: boolean = false;
    @Input() position: string = 'left';
    @Input() outline: boolean = true;
    @Input() type: string = 'primary';
    @Input() marginT: string = 'mt-2';
    @Output() textChanged = new EventEmitter<string>();

    onTextChanged(event: any) {
        this.textChanged.emit(event.target.value);
    }

    constructor() {}
}
