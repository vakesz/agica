
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  apiKey : string = 'AIzaSyDuRhkMY97JWGzRqXnd6rHVt2x71GWCJuY';

  constructor(public http: HttpClient) { }

    getVideosForChanel(channelId: string): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&channelId=' + channelId + '&order=date&part=snippet&type=video,id'
    return this.http.get<any>(url)
      .pipe(map((res) => {
        return res.items;
      }))
  }
}