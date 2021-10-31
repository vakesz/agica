import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(public http: HttpClient) { }

  apiKey : string = 'AIzaSyDuRhkMY97JWGzRqXnd6rHVt2x71GWCJuY';

  getCalendarData(calendarId : string, timeFrom : string) : Observable<Object> {
    let url = 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events?key=' + this.apiKey + '&orderBy=startTime&timeMin=' + timeFrom;
    return this.http.get<any>(url)
    .pipe(map((res) => {
      return res.items;
    }))
  }
}
