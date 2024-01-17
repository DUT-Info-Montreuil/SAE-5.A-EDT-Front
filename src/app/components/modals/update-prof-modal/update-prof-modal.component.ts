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
    personal_code: '',
    roles: ''
  };  
  isRoleClicked = false
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
  toggleRoleClicked() {
    this.isRoleClicked = !this.isRoleClicked;
  }
  
  submit() {
    switch (this.prof.roles) {
      case 'Professeur':
       this.prof.roles = 'TEACHER'
       break;
       case 'Responsable':
         this.prof.roles = 'TEACHER_RESPONSIBLE'
         break;
   }

    this.formSubmitted.emit(this.prof);
    this.close()
  }
  
}

