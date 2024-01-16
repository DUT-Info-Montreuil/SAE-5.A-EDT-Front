import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-ressource-modal',
  templateUrl: './update-ressource-modal.component.html',
  styleUrls: ['./update-ressource-modal.component.css']
})
export class UpdateRessourceModalComponent {

  @Input() isOpen!: boolean;
  @Input() ressource = {
    "color": '',
    "description": '',
    "hour_number": '',
    "semestre": '',
    "sequence": '',
    "specialization_id": '',
    "teaching_type": '',
    "title": ''
  };  
  isSpecializationClicked: boolean = false
  @Input() listeSpecialization!: any[];
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closed = new EventEmitter<boolean>();

  updateRessourceForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.updateRessourceForm = this.fb.group({
    });
  }

  close(reload: boolean = false) {
      this.closed.emit(reload);
  }

  submit() {
   

    const parcourTrouve = this.listeSpecialization.find(spe =>
      spe[2]=== this.ressource.specialization_id 
    );
    this.ressource.specialization_id = parcourTrouve[0]
    this.formSubmitted.emit(this.ressource);
    this.close()
    }
    specializationClicked() {
      this.isSpecializationClicked = true ;
    }
}
