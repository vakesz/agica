import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  constructor(public http: HttpClient) { }

  apiKey : string = 'AIzaSyBcDpzMK-Hy3lYpifTqPoMb88JH64vxiUE';

  getCalendarData(calendarId : string, timeFrom : string) : Observable<Object> {
    let url = `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${this.apiKey}&timeMin=${timeFrom}&maxResults=5&orderBy=startTime&singleEvents=true`;
    return this.http.get<any>(url)
      .pipe(map((res) => {
        return res.items;
      }))
  }

  getVideosForChanel(channelId: string): Observable<Object> {
    let url = `https://www.googleapis.com/youtube/v3/search?key=${this.apiKey}&channelId=${channelId}&order=date&part=snippet&type=video,id`
    return this.http.get<any>(url)
      .pipe(map((res) => {
        return res.items;
      }))
  }
}
