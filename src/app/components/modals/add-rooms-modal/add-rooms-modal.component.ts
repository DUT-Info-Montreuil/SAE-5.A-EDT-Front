import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-rooms-modal',
  templateUrl: './add-rooms-modal.component.html',
  styleUrls: ['./add-rooms-modal.component.css']
})
export class AddRoomsModalComponent {
  @Input() isOpen!: boolean;
  @Output() formSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() closed = new EventEmitter<boolean>();
  addRoomForm: FormGroup
  jsonSalle = {
    "capacity": 0,
    "code": '',
    "has_computer": false,
    "has_projector": false
  }
  
  constructor(private fb: FormBuilder) {
    this.addRoomForm = this.fb.group({
    });
  }

  close(reload: boolean = false) {
    this.closed.emit(reload);
  }

  submit() {
    this.formSubmitted.emit(this.jsonSalle);

  }
}
