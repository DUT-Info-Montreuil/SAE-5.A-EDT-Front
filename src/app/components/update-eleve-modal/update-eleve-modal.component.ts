import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-update-eleve-modal',
  templateUrl: './update-eleve-modal.component.html',
  styleUrls: ['./update-eleve-modal.component.css']
})
export class UpdateEleveModalComponent {
  @Input() isOpen!: boolean;
  @Input() eleve = {
    department_id: '',
    last_name: '',
    first_name: '',
    mail: '',
    phone_number: '',
    subgroup_id: '',
    group_id: '',
    student_number: ''
  };  
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closed = new EventEmitter<boolean>();

  updateEleveForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.updateEleveForm = this.fb.group({
    });
  }

  close(reload: boolean = false) {
      this.closed.emit(reload);
  }

  submit() {
    const updatedValues = {
      lastName: this.eleve.last_name,
      firstName: this.eleve.first_name,
      department_id: this.eleve.department_id,
      mail: this.eleve.mail,
      phone_number: this.eleve.phone_number,
      subgroup_id: this.eleve.subgroup_id,
      group_id: this.eleve.group_id,
      student_number: this.eleve.student_number
    };

    this.formSubmitted.emit(updatedValues);
  }
  
}
