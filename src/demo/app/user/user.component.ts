import { Component } from '@angular/core';

import { User } from '22ndtech-common-lib';

@Component({
  selector: 'user-test',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent {
  private user: User;


  constructor(
  ) {
    this.user = new User();
    this.user.email = 'jeff@22ndtech.com';
    this.user.firstName = 'Jeff';
    this.user.lastName = 'Hegedus';
    this.user.password = 'whatever';
    this.user.userName = 'jeff@22ndtech.com';
  }

}
