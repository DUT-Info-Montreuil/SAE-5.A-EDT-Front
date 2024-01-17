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
    id: '',
    first_name: '',
    last_name: '',
    mail: '',
    phone_number: '',
    personal_code: ''
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
    console.log("prof = " + JSON.stringify(this.prof, null, 2));


    this.formSubmitted.emit(this.prof);
    this.close()
  }
  
}

