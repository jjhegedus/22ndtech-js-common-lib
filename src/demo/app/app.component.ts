import { Component, OnInit } from '@angular/core';

import { User } from '22ndtech-common-lib';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private currentPage: string = 'undefined';
  private component: any;
  private user: User;


  constructor(
  ) {
  }

  ngOnInit() {
  }

}
