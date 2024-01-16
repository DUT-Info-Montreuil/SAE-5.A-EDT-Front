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
    "mail": '',
    "personal_code": '',
    "phone_number": '',
    "password": ''
  }

  constructor(private fb: FormBuilder) {
    this.addPersonalForm = this.fb.group({
    });
  }
  close(reload: boolean = false) {
    this.closed.emit(reload);
}

  submit () {
    this.formSubmitted.emit(this.jsonProf);
  }
}
