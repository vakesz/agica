import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router){}

  routeIsActive(routePath: string) {
    return this.router.url == routePath;
  }

  ngOnInit(): void {
    const burger = document.querySelector('#burger');
    const burgerOpen = document.querySelector('#burger-open');
    const burgerClose = document.querySelector('#burger-close');
    const navbarMenu = document.querySelector('#mobile-menu');

    burger?.addEventListener('click', () => {
      navbarMenu?.classList.toggle('hidden');
      burgerOpen?.classList.toggle('hidden');
      burgerClose?.classList.toggle('hidden');
    });
  }
}
