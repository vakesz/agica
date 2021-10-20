import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {
    const burgerIcon = document.querySelector('#burger');
    const navbarMenu = document.querySelector('#nav-links');
    const menuItem = document.getElementById('#menu-item');

    burgerIcon?.addEventListener('click', () => {
      navbarMenu?.classList.toggle('is-active');
      burgerIcon?.classList.toggle('is-active');
    });

    navbarMenu?.addEventListener('click', () => {
      navbarMenu?.classList.toggle('is-active');
      burgerIcon?.classList.toggle('is-active');
    });
  }

}
