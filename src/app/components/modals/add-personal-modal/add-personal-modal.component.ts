import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-personal-modal',
  templateUrl: './add-personal-modal.component.html',
  styleUrls: ['./add-personal-modal.component.css']
})
export class AddPersonalModalComponent {
  @Input() isOpen!: boolean;
  @Output() closed = new EventEmitter<boolean>();
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  addPersonalForm: FormGroup
  jsonProf = {
    "first_name": '',
    "last_name": '',
    "personal_code": '',
    "password": '',
    "id": '',
    "roles": ''
  }

  constructor(private fb: FormBuilder) {
    this.addPersonalForm = this.fb.group({
    });
  }
  close(reload: boolean = false) {
    this.closed.emit(reload);
}

  submit () {
    switch (this.jsonProf.roles) {
       case 'Professeur':
        this.jsonProf.roles = 'TEACHER'
        break;
        case 'Responsable':
          this.jsonProf.roles = 'TEACHER_RESPONSIBLE'
          break;
    }
    this.formSubmitted.emit(this.jsonProf);
    this.close()
  }
 
}
