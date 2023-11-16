import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DateFormattingService } from 'src/app/services/date-formatting.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  formattedDate: string | null;
  showError: boolean = false;

  constructor(private dateFormattingService: DateFormattingService) {
      this.formattedDate = this.dateFormattingService.format(new Date());
  }

  resetError() {
    this.showError = false; // Réinitialise showError à false lorsque l'utilisateur entre dans le champ
  }

  checkLength(value: string) {
    if (value.length < 8 ) {
      this.showError = true; // Affiche l'erreur si la longueur est inférieure à 8
    }
  }

  checkSameInput(value: string) {
    // TODO A codé avec une fois accès à l'api 
  }
}