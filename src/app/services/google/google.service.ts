import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GoogleService {
  constructor(public http: HttpClient) { }

  getCalendarData(timeFrom : string) : Observable<Object> {
    let url = `https://api.agiica.com/calendar?maxResults=5&orderBy=startTime&singleEvents=true&timeMin=${timeFrom}`;
    return this.http.get<any>(url)
      .pipe(map((res) => {
        return res.items;
      }));
  }

  getVideosForChanel(channelId: string): Observable<Object> {
    let url = `https://api.agiica.com/youtube?order=date&part=snippet&type=video,id&channelId=${channelId}`;
    return this.http.get<any>(url)
      .pipe(map((res) => {
        return res.items;
      }));
  }
}
