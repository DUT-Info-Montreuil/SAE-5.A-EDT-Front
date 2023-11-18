import { Component } from '@angular/core';
import { DateFormattingService } from 'src/app/services/date-formatting.service';

@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent {
  formattedDate: string | null;

  constructor( private dateFormattingService: DateFormattingService) {

    this.formattedDate = this.dateFormattingService.format(new Date());
  
  }


}
