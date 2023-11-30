import { registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import localeFr from '@angular/common/locales/fr'
import { Subject } from 'rxjs';


const jsonData = {
  "edt": [
    {
        "endtime": "2023-11-30T12:30",
        "starttime": "2023-11-30T10:30",
        "title": "Modélisations",
        "description":"jsp au nom",
        "location": "A2-05",
        "organizer": "PB",
    },
    {
        "endtime": "2023-11-30T12:30",
        "starttime": "2023-11-30T09:30",
        "title": "Anglais",
        "description":"jsp au nomo",
        "location": "A2-05",
        "organizer": "AGo",
    },
    {
        "endtime": "2023-11-30T12:30",
        "starttime": "2023-11-30T10:30",
        "title": "jsp au nom",
        "description":"jsp au nom",
        "location": "A2-05",
        "organizer": "Lui",
    },
    {

        "endtime": "2023-11-30T14:30",
        "starttime": "2023-11-30T13:00",
        "title": "Initiation",
        "description":"test",
        "location": "A2-05",
        "organizer": "JEMi",
    }
]
};

registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-calendar',
  encapsulation : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})


  
export class CalendarComponent {
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  calendarView = CalendarView;
  excludeDays: number[] = [0, 6]; // Exclue dimanche et samedi
  events: any [] = [];
  dayStartHour: number = 8; // Demarre à 8h
  dayEndHour: number = 18;  // Termine à 19h
  hourSegments: number = 2; // une ligne tout les quart d'heure
  isCreationModalOpen: boolean = false;
  refresh = new Subject<void>;
  eventDetails: any = null; 

  constructor() {
  this.convertToCalendarEvents(jsonData);

  }

  setView(view: CalendarView) {
    this.view = view;
  }
  
  eventClicked() {
    if (this.view === this.calendarView.Day ){
      this.setView(this.calendarView.Week);
    } else {
      this.setView(this.calendarView.Day);
      }
    }

    dayViewClick() {
      this.setView(this.calendarView.Week);
    }

    changeDay(date: Date) {
      this.viewDate = date;
      this.view = CalendarView.Day;
    }

  eventTimesChanged(event: any) {
    //TODO Renvoyez les nouvelles dates à la BD
    event.event.start = event.newStart; 
    event.event.end = event.newEnd;
    this.refresh.next();
  }

  openCreationModal() {
    this.isCreationModalOpen = true;
  }

  closeCreationModal() {
    this.isCreationModalOpen = false;
  }

  convertToCalendarEvents(jsonData: any): CalendarEvent[] {
    const events: CalendarEvent[] = [];
  
    if (jsonData && jsonData.edt) {
      jsonData.edt.forEach((item: any) => {
        const event: CalendarEvent = {
          title: item.title, 
          start: new Date(item.starttime), 
          end: new Date(item.endtime),
          draggable: true,
          resizable: {
            beforeStart: true, 
            afterEnd: true,
          },         
          cssClass: './calendar.component.css',
          meta: {
            location: item.location,
            organizer: item.oragnizer,
            description: item.description
          }        };
        this.events.push(event);
      });
    }
  
    return events;
  }
  
  showEventDetails(event: any) {
    this.eventDetails = event;
  }
  closeEventDetails() {
    this.eventDetails = null;
  }
  debug(s: any) {
    console.log(s)
  }
}
  
