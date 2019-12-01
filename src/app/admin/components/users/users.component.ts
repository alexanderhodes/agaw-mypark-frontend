import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private _users: Array<{username: string, email: string, parkingspace: boolean, admin: boolean}>;

  constructor() {
    this._users = [];
  }

  ngOnInit() {
    this._users.push({username: 'alex', email: 'alexander.hodes@live.com', parkingspace: false, admin: true});
    this._users.push({username: 'john', email: 'john.doe@internet.com', parkingspace: true, admin: false});
    this._users.push({username: 'max', email: 'max.mustermann@internet.de', parkingspace: true, admin: true});
    this._users.push({username: 'jane', email: 'jane.doe@internet.com', parkingspace: false, admin: false});
  }

  get users(): Array<{username: string, email: string, parkingspace: boolean, admin: boolean}> {
    return this._users;
  }

}
