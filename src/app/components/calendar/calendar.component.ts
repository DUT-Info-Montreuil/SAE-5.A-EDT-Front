import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';

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
  dayEndHour: number = 19;  // Termine à 19h
  hourSegments: number = 4; 

  minTime: Date = new Date(); // Start time
  maxTime: Date = new Date(); // End time

  constructor() {
    this.minTime.setHours(8, 0, 0); // 8:00 AM
    this.maxTime.setHours(16, 0, 0); // 4:00 PM
    const event1 ={
      title: "BDD",
      start: new Date("2023-11-18T10:30"),
      end: new Date("2023-11-18T12:30"),
    }
    this.events.push(event1);
  }
  setView(view: CalendarView) {
    this.view = view;
  }
  

}
