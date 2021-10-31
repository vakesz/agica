import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { CalendarService } from 'src/app/services/calendar.service';
import * as moment from 'moment';
import * as $ from 'jquery';

declare var gapi: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarItems!: any;
  private unsubscribe$: Subject<any> = new Subject();

  constructor(private calendarService : CalendarService) { }

  ngOnInit(): void {  {
    this.calendarItems = [];
    this.calendarService
      .getCalendarData('bgudccobvjdigft93bk4njsvt0@group.calendar.google.com', new Date().toISOString())
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.calendarItems = data;
      }); 
    }
  }
}
