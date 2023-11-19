import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import localeFr from '@angular/common/locales/fr'
import { Subject } from 'rxjs';

registerLocaleData(localeFr, 'fr');
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})


export class CalendarComponent {
  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  calendarView = CalendarView;
  excludeDays: number[] = [0, 6]; // Exclue dimanche et samedi
  events: CalendarEvent[] =[];
  dayStartHour: number = 8; // Demarre à 8h
  dayEndHour: number = 18;  // Termine à 19h
  hourSegments: number = 4; // une ligne tout les quart d'heure

  refresh = new Subject<void>;

  constructor() {
    const event0 ={
      title: "Anglais",
      start: new Date("2023-11-23T12:30"),
      end: new Date("2023-11-23T14:00"),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    } 
    this.events.push( event0 );
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

}
