import { User } from './../../../shared/models/mypark.models';
import { MyparkApiService } from './../../../shared/services/api/mypark-api.service';
import { Component, OnInit } from '@angular/core';
import {ModalConfiguration} from '../../../shared/models/component.models';
import {ModalService} from '../../../shared/services/common/modal.service';

@Component({
  selector: 'mp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private _users: User[];
  private _deleteModalConfiguration: ModalConfiguration;
  private _deleteUser: User;

  constructor(private apiService: MyparkApiService, private modalService: ModalService) {
    this._users = [];
  }

  ngOnInit() {
    this.apiService.getAllUsers().subscribe((users: User[]) => {
      this._users = users;
    });
  }

  get users(): User[] {
    return this._users;
  }

  get deleteModalConfiguration(): ModalConfiguration {
    return this._deleteModalConfiguration;
  }

  public contactUser(user: User): void {
    window.open(`mailto:${user.username}&subject='MyPark - Kontakt'`);
  }

  public deleteUser(user: User): void {
    // ToDo: open popup
    this._deleteUser = user;
    this._deleteUser['enabled'] = false;
    const text = `Möchten Sie den Benutzer ${user.firstName} ${user.lastName} wirklich löschen?`;
    this._deleteModalConfiguration = this.initDeleteModalConfiguration(text);
    this.modalService.show(this._deleteModalConfiguration.id);
  }

  public confirmDeleteUser(event: any): void {
    this.apiService.updateUser(this._deleteUser.id, this._deleteUser).subscribe((response) => {
      console.log('response', response);
      const index = this._users.findIndex((user: User) => {
        return user.id === this._deleteUser.id;
      });

      if (index > -1) {
        this._users.splice(index, 1);
        this._deleteUser = null;
      }
    });
  }

  private initDeleteModalConfiguration(text: string): ModalConfiguration {
    return {
      id: 'modalDelete',
      title: 'Benutzer löschen',
      text,
      closeText: 'bestätigen'
    };
  }

}
