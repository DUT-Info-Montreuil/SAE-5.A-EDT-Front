import { registerLocaleData } from '@angular/common';
import { Component } from '@angular/core';
import { CalendarEvent, CalendarNativeDateFormatter, CalendarView, DateFormatterParams } from 'angular-calendar';
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
  excludeDays: number[] = [0, 6];
  events: CalendarEvent[] =[];
  dayStartHour: number = 8; // Demarre à 8h
  dayEndHour: number = 18;  // Termine à 19h
  hourSegments: number = 4; 

  refresh = new Subject<void>;
  constructor() {
 

    const event1 ={
      title: "BDD",
      start: new Date("2023-11-22T10:30"),
      end: new Date("2023-11-22T12:30"),
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    }
    this.events.push(event1);
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  eventClicked(event: any) {
    console.log(event);

  }
  eventTimesChanged(event: any) {
    event.event.start = event.newStart;
    event.event.end = event.newEnd;
    this.refresh.next();
  }

}
