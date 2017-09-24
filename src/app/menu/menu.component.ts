import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor() { }

  menu = [{name: 'Sklad', href:'sklad'},
          {name: 'Objednávka', href: 'objednavka'}
          ];

  ngOnInit() {
  }

}
