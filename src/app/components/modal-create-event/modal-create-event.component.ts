import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-create-event',
  templateUrl: './modal-create-event.component.html',
  styleUrls: ['./modal-create-event.component.css']
})
export class ModalCreateEventComponent {
  @Output() closeModal = new EventEmitter<void>();

  onClose() {
    this.closeModal.emit();
  }
}
