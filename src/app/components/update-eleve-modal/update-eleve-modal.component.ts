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

  @Output() closed = new EventEmitter<boolean>();

  updateEleveForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.updateEleveForm = this.fb.group({
    });
  }

  async submit() {
    console.log(this.eleve)
  }

  close(reload: boolean = false) {
      this.closed.emit(reload);
  }

}
