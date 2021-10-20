import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import * as $ from 'jquery';

declare var gapi: any;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  calendarItems: any[] | undefined;

  constructor() { }

  ngOnInit(): void {  {

    var calendarId = 'bgudccobvjdigft93bk4njsvt0@group.calendar.google.com'; // TO BE CHANGED
    var apiKey = 'AIzaSyCU-1fH-6AFoDLS4CpUf25NS_-EO_MqmEQ';
    var userTimeZone = "Europe/Budapest";

    gapi.load('client:auth2', initClient);

    function initClient() {
      gapi.client.init({
            'apiKey': apiKey,
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
        }).then(function () {
            return gapi.client.calendar.events.list({
                'calendarId': calendarId,
                'timeZone': userTimeZone,
                'singleEvents': true,
                'timeMin': (new Date()).toISOString(), 
                'maxResults': 10,
                'orderBy': 'startTime'
            });
        }).then(function (response: { result: { items: any[]; }; }) {
            if (response.result.items) {
                var calendarRows = [];
                console.log(response.result.items);
                response.result.items.forEach(function(entry) {
                    var startsAt = moment(entry.start.dateTime).format("YYYY MMMM DD.") + ' ' + moment(entry.start.dateTime).format("HH:mm");
                    var endsAt = moment(entry.end.dateTime).format("HH:mm");
                    calendarRows.push(`<div class="box"><article class="media"><div class="media-left"><figure class="image is-64x64">`);
                    if (entry.location == "PUBG") calendarRows.push(`<img src="assets/img/pubg.webp" alt="Image">`);
                    if (entry.location == "R6") calendarRows.push(`<img src="assets/img/r6.webp" alt="Image">`);
                    if (entry.location == "VALORANT") calendarRows.push(`<img src="assets/img/valorant.webp" alt="Image">`);
                    if (entry.location == "CHAT") calendarRows.push(`<img src="assets/img/chat.webp" alt="Image">`);
                    calendarRows.push(`</figure></div><div class="media-content">`);
                    calendarRows.push(`<div class="content"><p><strong> ${entry.summary} </strong> <small>${startsAt} - ${endsAt}</small>`);
                    calendarRows.push(`<br> ${entry.description} </p></div></div></article></div>`);
                });
                calendarRows.push('');
                $('#calendar').html(calendarRows.join(""));
            }
        }, function (reason: { result: { error: { message: string; }; }; }) {
            console.log('Error: ' + reason.result.error.message);
        });
      };
      }
    }
  }

