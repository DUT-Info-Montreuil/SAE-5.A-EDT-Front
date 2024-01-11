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
    title: '',
    teaching_type: '',
    semestre: '',
    hour_number: '',
    color: '',
    sequence: ''
  };  
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
    const updatedValues = {
      title: this.ressource.title,
      teaching_type: this.ressource.teaching_type,
      semestre: this.ressource.semestre,
      hour_number : this.ressource.hour_number,
      color : this.ressource.color,
      sequence : this.ressource.sequence
    };

    this.formSubmitted.emit(updatedValues);
  }
  
}
