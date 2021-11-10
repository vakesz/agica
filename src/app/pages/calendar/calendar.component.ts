import { Component, OnInit } from '@angular/core';
import { GoogleService } from 'src/app/services/google/google.service';
import { FormControl } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarItems!: any;
  date = new FormControl(new Date());
  
  constructor(private googleService : GoogleService) { }

  ngOnInit(): void {  
    this.calendarItems = [];
    this.getCalendar();
  }

  getCalendar(): void {
    let pickedDate = this.date.value.toISOString();
    console.log(pickedDate)
    this.googleService
    .getCalendarData('bgudccobvjdigft93bk4njsvt0@group.calendar.google.com', pickedDate).subscribe((data) => {
      this.calendarItems = data
      this.formatDates();
    })
  }
  
  formatDates(): void {
    moment.locale('HU');
    for (let i in this.calendarItems) {
      this.calendarItems[i].start.dateTime = moment(this.calendarItems[i].start.dateTime).format("YYYY MMM D ddd HH:mm");
      this.calendarItems[i].end.dateTime = moment(this.calendarItems[i].end.dateTime).format("HH:mm");
    }
  }

  refreshOnDateChange(index : Number, date : FormControl) : Date {
    return date.value;
  }
}
