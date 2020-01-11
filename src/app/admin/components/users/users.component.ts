import {User, UserAdmin} from './../../../shared/models/mypark.models';
import { Component, OnInit } from '@angular/core';
import {ModalConfiguration} from '../../../shared/models/component.models';
import {ModalService} from '../../../shared/services/common/modal.service';
import {UserService} from '../../../shared/services/api/user.service';

@Component({
  selector: 'mp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  private _deleteModalConfiguration: ModalConfiguration;
  private _updateAdminRightsModalConfiguration: ModalConfiguration;
  private _deleteUser: User;
  private _selectedUser: User;
  private _userAdmins: UserAdmin[];

  public isLoading: boolean;

  constructor(private userService: UserService,
              private modalService: ModalService) {
    this._userAdmins = [];
    this.isLoading = false;
  }

  ngOnInit() {
    this.isLoading = true;

    this.userService.getUserAdmins().subscribe((userAdmins: UserAdmin[]) => {
      this._userAdmins = userAdmins;
      this.isLoading = false;
    }, error => this.isLoading = false);

  }

  get userAdmins(): UserAdmin[] {
    return this._userAdmins;
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
    this._deleteUser = user;
    this._deleteUser['enabled'] = false;
    const text = `Möchten Sie den Benutzer ${user.firstName} ${user.lastName} wirklich löschen?`;
    this._deleteModalConfiguration = this.initDeleteModalConfiguration(text);
    this.modalService.show(this._deleteModalConfiguration.id);
  }

  public updateAdminRights(user: User, admin: boolean): void {
    this._selectedUser = user;
    const text = admin ? `Möchten Sie dem Benutzer ${user.firstName} ${user.lastName} die Admin-Rechte entziehen?` :
      `Möchten Sie dem Benutzer ${user.firstName} ${user.lastName} Admin-Rechte geben?`;
    this._updateAdminRightsModalConfiguration = this.initUpdateAdminRightsModalConfiguration(text);
    this.modalService.show(this._updateAdminRightsModalConfiguration.id);
  }

  public confirmDeleteUser(event: any): void {
    this.userService.updateUser(this._deleteUser.id, this._deleteUser).subscribe((response) => {
      console.log('response', response);
      const index = this._userAdmins.findIndex((user: UserAdmin) => {
        return user.user.id === this._deleteUser.id;
      });

      if (index > -1) {
        this._userAdmins.splice(index, 1);
        this._deleteUser = null;
      }
    });
  }

  public confirmUpdateAdminRights(event: any): void {
    const id = this._selectedUser.id;
    this.userService.updateAdminRights(id).subscribe((response: User) => {
      const index = this._userAdmins.findIndex((userAdmin: UserAdmin) => {
        return userAdmin.user.id === response.id;
      });

      if (index > -1) {
        this._userAdmins[index].admin = !this._userAdmins[index].admin;
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

  private initUpdateAdminRightsModalConfiguration(text: string): ModalConfiguration {
    return {
      id: 'modalUpdateAdminRights',
      title: 'Admin-Rechte zuweisen',
      text,
      closeText: 'bestätigen'
    };
  }

}
