import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { GoogleService } from 'src/app/services/google/google.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videos!: any;
  private unsubscribe$: Subject<any> = new Subject();

  constructor(private googleService: GoogleService) { }

  ngOnInit() {
    this.videos = [];
    this.googleService
      .getVideosForChanel('UCgTYGjFd27awbt4yRiK_PFQ')
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        this.videos = data;
      }); 
    }

    

}
