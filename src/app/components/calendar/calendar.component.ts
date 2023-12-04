import { DatePipe, registerLocaleData } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import localeFr from '@angular/common/locales/fr'
import { Subject } from 'rxjs';
import axios from 'axios';
import { endOfWeek, format, startOfWeek } from 'date-fns';


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
  events: CalendarEvent [] = [];
  dayStartHour: number = 8; // Demarre à 8h
  dayEndHour: number = 18;  // Termine à 19h
  hourSegments: number = 4; // une ligne tout les quart d'heure
  isCreationModalOpen: boolean = false;
  refresh = new Subject<void>;
  eventDetails: any = null; 
  mapIdNomProfs = new Map<string, string>();
  mapIdNomSalle = new Map<string, string>();
  mapIdNomPromo = new Map<string, string>();
  constructor() {
    this.initSelectFields();
  }
  async initSelectFields () {
    const response = await axios.get(`${environment.apiUrl}/personals/get`, {});
    let data = response.data.map((person: any) => [person.personal_code, person.id]);
    data.forEach((tab: string[]) => {
      this.mapIdNomProfs.set(tab[0], tab[1]);
    });
    let selectElement = document.querySelector('.selectProf');

    let keys = Array.from(this.mapIdNomProfs.keys());
    keys.forEach((key: string) => {
      let option = document.createElement('option');
      option.text = key || '';   
      selectElement?.appendChild(option);
    });

    let response1 = await axios.get(`${environment.apiUrl}/rooms/get`, {});
    let selectElement2 = document.querySelector('.selectSalle');
    let data2 = response.data.map((salle: any) => [salle.code, salle.id]);
    data2.forEach((tab: string[]) => {
      this.mapIdNomProfs.set(tab[0], tab[1]);
    });
    let salle = Array.from(this.mapIdNomSalle.keys());

    salle.forEach(nomSalle => {
      let option = document.createElement('option');
      option.value = nomSalle;
      option.text = nomSalle;
      selectElement2?.appendChild(option);
    });
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
  onSelectChange(event: any) {
      let startOfCurrentWeek: string = "";
      let endOfCurrentWeek: string = "";
      if (this.view === CalendarView.Week) { 
        endOfCurrentWeek = format(new Date(endOfWeek(this.viewDate)), 'yyyy-MM-dd');
        startOfCurrentWeek = format(new Date(startOfWeek(this.viewDate)), 'yyyy-MM-dd');
      }
      this.convertToCalendarEvents(event.target.value, startOfCurrentWeek, endOfCurrentWeek);
    }
  
  async convertToCalendarEvents(event : string, endDate: string, startDate: string ){
    const data = {
      "personnal_id": this.mapIdNomProfs.get(event)?.toString(),
      "week_date_start": endDate,
      "week_date_end": startDate
    }
    let response1 = await axios.post(`${environment.apiUrl}/timetable/get/byteacher`, data);
    const dataValues = Object.values(response1.data);
    dataValues.forEach((item: any) => {
      const event: CalendarEvent = {
        title: item.teaching_title,
        start: new Date(item.starttime),
        end: new Date(item.endtime),
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
        cssClass: './calendar.component.css',
        meta: {
          location: item.room_name,
          organizer: item.personal_code,
          description: item.description || ''
        }
      };
      this.events.push(event);
    });
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
  
