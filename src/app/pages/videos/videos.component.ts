import { Component, OnInit } from '@angular/core';
import { GoogleService } from 'src/app/services/google/google.service';
import * as moment from "moment";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {
  videos!: any;
  targetModal! : any;

  constructor(private googleService: GoogleService) { }

  playVideo(event:any, video:any) {
    let target = event.target.id;

    this.targetModal = document.querySelector('#yt-modal');
    (<HTMLIFrameElement>document.getElementById('iframe')).src = "https://www.youtube.com/embed/" + target;
    this.targetModal?.classList.remove('hidden');
  }

  closeVideo(event:any) {
    let targetCloseModal = document.querySelector('#modal-background');
    (<HTMLIFrameElement>document.getElementById('iframe')).src = "";
    this.targetModal?.classList.add('hidden');
  }

  ngOnInit() {
    this.videos = [];
    this.googleService
      .getVideosForChanel('UCgTYGjFd27awbt4yRiK_PFQ').subscribe((data) => {
        this.videos = data;
        this.formatDates();
      });
    }

  formatDates(): void {
    moment.locale('HU');
    for (let i in this.videos) {
      this.videos[i].snippet.publishTime = moment(this.videos[i].snippet.publishTime).format("YYYY MMMM DD");
    }
  }

}
