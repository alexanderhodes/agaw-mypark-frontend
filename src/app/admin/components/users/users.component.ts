import { User } from './../../../shared/models/mypark.models';
import { MyparkApiService } from './../../../shared/services/api/mypark-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private _users: User[];

  constructor(private apiService: MyparkApiService) {
    this._users = [];
  }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe((users: User[]) => {
      this._users = users;
    });
  }

  contactUser(user: User): void {
    window.open(`mailto:${user.username}&subject='MyPark - Kontakt'`);
  }

  get users(): User[] {
    return this._users;
  }

}
