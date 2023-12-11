import { Component } from '@angular/core';
import { DateFormattingService } from 'src/app/services/date-formatting.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  formattedDate: string | null;
  searchIsOpen: boolean = false;

  constructor( private dateFormattingService: DateFormattingService) {

    this.formattedDate = this.dateFormattingService.format(new Date());
  
  }


}
