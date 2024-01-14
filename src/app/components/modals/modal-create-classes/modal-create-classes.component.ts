import { Time } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-create-classes',
  templateUrl: './modal-create-classes.component.html',
  styleUrls: ['./modal-create-classes.component.css']
})
export class ModalCreateClassesComponent {
  @Output() closeModal = new EventEmitter<void>();
  timeInputInvalid: boolean[] = [false, false]; // L'index 0 est pour le startingTime, le 1 pour l'endingTime
  
  titreCours: string = '';
  profCours: string = '';
  salleCours: string = '';
  dateCours: string = '';
  debutCours: string = '';
  finCours: string = '';

  onClose() {
    this.closeModal.emit();
  }

  validateTime(event: Event, id: number) {
    const target = event.target as HTMLInputElement;
    const value = target.value;
    const regex = /^((0[8-9]|1[0-9]|20)h([0-5][0-9]))$/;

    if (!regex.test(value)) {
      this.timeInputInvalid[id] = true;
    } else {
      const [hours, minutes] = value.split('h');
      const parsedHours = parseInt(hours, 10);
      const parsedMinutes = parseInt(minutes, 10);
      if (parsedHours < 0 || parsedHours > 23 || parsedMinutes < 0 || parsedMinutes > 59) {
        this.timeInputInvalid[id] = true;
      } else {
        this.timeInputInvalid[id] = false;
      }
    }
  }
  
  submitForm() {
    const eventData = {
      TitreCours: this.titreCours,
      ProfCours : this.profCours,
      SalleCours : this.salleCours,
      DateCours : this.dateCours,
      DebutCours: this.debutCours,
      FinCours: this.finCours
    };
    console.log(eventData);
  }
}
