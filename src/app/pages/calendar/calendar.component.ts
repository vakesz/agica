import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { GoogleService } from 'src/app/services/google/google.service';
import * as moment from 'moment';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarItems!: any;
  private unsubscribe$: Subject<any> = new Subject();

  constructor(private googleService : GoogleService) { }

  ngOnInit(): void {  {
    this.calendarItems = [];
    this.googleService
      .getCalendarData('bgudccobvjdigft93bk4njsvt0@group.calendar.google.com', new Date().toISOString())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.calendarItems = data;
        this.formatDates();
      }); 
    }
  }

  formatDates(): void {
    for (let i in this.calendarItems) {
      this.calendarItems[i].start.dateTime = moment(this.calendarItems[i].start.dateTime).format("YYYY MMMM DD.") + ' ' + moment(this.calendarItems[i].start.dateTime).format("HH:mm");
      this.calendarItems[i].end.dateTime = moment(this.calendarItems[i].end.dateTime).format("HH:mm");
    }
  }
}
