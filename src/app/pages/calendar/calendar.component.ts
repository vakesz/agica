import { Component, OnInit } from '@angular/core';
import { GoogleService } from 'src/app/services/google/google.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarItems!: any;

  constructor(private googleService : GoogleService) { }

  ngOnInit(): void {  {
    this.calendarItems = [];
    this.googleService
      .getCalendarData('bgudccobvjdigft93bk4njsvt0@group.calendar.google.com', new Date().toISOString()).subscribe((data) => {
        this.calendarItems = data
        this.formatDates();
      });
    }
  }

  formatDates(): void {
    moment.locale('HU');
    for (let i in this.calendarItems) {
      this.calendarItems[i].start.dateTime = moment(this.calendarItems[i].start.dateTime).format("YYYY MMM D ddd HH:mm");
      this.calendarItems[i].end.dateTime = moment(this.calendarItems[i].end.dateTime).format("HH:mm");
    }
  }
}
