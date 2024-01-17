import { Component } from '@angular/core';
import { DateFormattingService } from 'src/app/services/date-formatting.service';

@Component({
  selector: 'app-gestion-admin',
  templateUrl: './gestion-admin.component.html',
  styleUrls: ['./gestion-admin.component.css']
})
export class GestionAdminComponent {
  formattedDate: string | null;

  constructor( private dateFormattingService: DateFormattingService) {

    this.formattedDate = this.dateFormattingService.format(new Date());
  
  }
}
