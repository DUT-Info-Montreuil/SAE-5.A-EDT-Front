import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ColorType } from 'src/app/models/enums';

@Component({
    selector: 'app-add-teachings-modal',
    templateUrl: './add-teachings-modal.component.html',
    styleUrls: ['./add-teachings-modal.component.css'],
})
export class AddTeachingsModalComponent {
    @Input() isOpen!: boolean;
    @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
    @Output() closed = new EventEmitter<boolean>();
    addRessourceFrom: FormGroup;
    @Input() listeSpecialization!: any[];
    jsonRessource = {
        color: '',
        description: '',
        hour_number: '',
        semestre: '',
        sequence: '',
        specialization_id: '',
        teaching_type: '',
        title: '',
    };
    colors: string[];

    constructor(private fb: FormBuilder) {
        this.addRessourceFrom = this.fb.group({});
        this.colors = this.getEnumValues(ColorType);
    }

    close(reload: boolean = false) {
        this.closed.emit(reload);
    }

    submit() {
        const parcourTrouve = this.listeSpecialization.find((spe) => spe[2] === this.jsonRessource.specialization_id);
        this.jsonRessource.specialization_id = parcourTrouve[0];
        this.formSubmitted.emit(this.jsonRessource);
    }

    getEnumValues(enumType: any): string[] {
        return Object.values(enumType).filter((value) => typeof value === 'string') as string[];
    }
}
