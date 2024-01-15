import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-salle-modal',
  templateUrl: './update-salle-modal.component.html',
  styleUrls: ['./update-salle-modal.component.css']
})
export class UpdateSalleModalComponent {

  @Input() isOpen!: boolean;
  @Input() salle = {
    code: '',
    capacity: '',
    has_computer: '',
    has_projector: '',
    id: ''
  };  
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closed = new EventEmitter<boolean>();

  updateSalleForm: FormGroup;


  constructor(private fb: FormBuilder) {
    this.updateSalleForm = this.fb.group({
    });
  }

  close(reload: boolean = false) {
      this.closed.emit(reload);
  }

  submit() {
       this.formSubmitted.emit(this.salle);
    this.close()
  }
  
}
