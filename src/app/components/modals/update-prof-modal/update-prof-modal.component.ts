import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-prof-modal',
  templateUrl: './update-prof-modal.component.html',
  styleUrls: ['./update-prof-modal.component.css']
})
export class UpdateProfModalComponent {
  @Input() isOpen!: boolean;
  @Input() prof = {
    last_name: '',
    first_name: '',
    mail: '',
    personal_code: '',
    id: ''
  };  
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closed = new EventEmitter<boolean>();

  updateProfForm: FormGroup;
  listeDepartmenent: any[] = [];


  constructor(private fb: FormBuilder) {
    this.updateProfForm = this.fb.group({
    });
  }

  close(reload: boolean = false) {
      this.closed.emit(reload);
  }

  submit() {
    const updatedValues = {
      lastName: this.prof.last_name,
      firstName: this.prof.first_name,
      mail: this.prof.mail,
      personal_code : this.prof.personal_code,
      id : this.prof.id,
      phone_number : this.prof.id
    };

    this.formSubmitted.emit(updatedValues);
  }
  
}

