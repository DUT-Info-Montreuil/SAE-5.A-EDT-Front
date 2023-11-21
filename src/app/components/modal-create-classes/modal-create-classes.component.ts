import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-create-classes',
  templateUrl: './modal-create-classes.component.html',
  styleUrls: ['./modal-create-classes.component.css']
})
export class ModalCreateClassesComponent {
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }
}
