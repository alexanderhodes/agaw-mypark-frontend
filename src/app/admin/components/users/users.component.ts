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
  private _updateAdminRightsModalConfiguration: ModalConfiguration;
  private _deleteUser: User;
  private _selectedUser: User;

  public isAdmin: boolean;

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

  get updateAdminRightsModalConfiguration(): ModalConfiguration {
    return this._updateAdminRightsModalConfiguration;
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

  public updateAdminRights(user: User, admin: boolean): void {
    this._selectedUser = user;
    const text = admin ? `Möchten Sie dem Benutzer ${user.firstName} ${user.lastName} die Admin-Rechte entziehen?` :
      `Möchten Sie dem Benutzer ${user.firstName} ${user.lastName} Admin-Rechte entfernen?`;
    this._updateAdminRightsModalConfiguration = this.initUpdateAdminRightsModalConfiguration(text);
    this.modalService.show(this._updateAdminRightsModalConfiguration.id);
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

  public confirmUpdateAdminRights(event: any): void {
    const id = this._selectedUser.id;
    this.apiService.updateAdminRights(id).subscribe((response: User) => {
      this.isAdmin = !this.isAdmin;
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

  private initUpdateAdminRightsModalConfiguration(text: string): ModalConfiguration {
    return {
      id: 'modalUpdateAdminRights',
      title: 'Admin-Rechte zuweisen',
      text,
      closeText: 'bestätigen'
    };
  }

}
