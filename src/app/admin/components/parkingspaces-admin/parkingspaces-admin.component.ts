import {ParkingSpace, ParkingSpaceUser, User} from './../../../shared/models/mypark.models';
import { Component, OnInit } from '@angular/core';
import {Message, ModalConfiguration} from '../../../shared/models/component.models';
import {ModalService} from '../../../shared/services/common/modal.service';
import {ParkingSpaceService} from '../../../shared/services/api/parking-space.service';
import {UserService} from '../../../shared/services/api/user.service';

@Component({
  selector: 'mp-parkingspaces-admin',
  templateUrl: './parkingspaces-admin.component.html',
  styleUrls: ['./parkingspaces-admin.component.scss']
})
export class ParkingspacesAdminComponent implements OnInit {

  public number: string;
  public isLoading: boolean;
  public message: Message;

  private _parkingSpacesWithUser: ParkingSpaceUser[];
  private _users: User[];
  private _assignmentModalConfiguration: ModalConfiguration;
  private _unassignmentModalConfiguration: ModalConfiguration;
  private _deleteParkingSpaceConfiguration: ModalConfiguration;
  private _selectedParkingSpace: ParkingSpace;
  private _selectedUser: string;
  private _selectedParkingSpaceUser: ParkingSpaceUser;

  constructor(private parkingSpaceService: ParkingSpaceService,
              private userService: UserService,
              private modalService: ModalService) {
    this._parkingSpacesWithUser = [];
    this._users = [];
    this.isLoading = false;
    this.message = { success: false, text: null };
  }

  ngOnInit() {
    this.isLoading = true;

    this.parkingSpaceService.getParkingSpacesWithUsers().subscribe((parkingSpaces: ParkingSpaceUser[]) => {
      this._parkingSpacesWithUser = parkingSpaces;
      this.isLoading = false;
    }, error => this.isLoading = false);

    this.userService.getUsersWithParkingSpaces(false).subscribe((users: User[]) => {
      this._users = users;
    });
  }

  get assignmentModalConfiguration(): ModalConfiguration {
    return this._assignmentModalConfiguration;
  }

  get unassignmentModalConfiguration(): ModalConfiguration {
    return this._unassignmentModalConfiguration;
  }

  get deleteParkingSpaceConfiguration(): ModalConfiguration {
    return this._deleteParkingSpaceConfiguration;
  }

  get parkingSpacesWithUser(): ParkingSpaceUser[] {
    return this._parkingSpacesWithUser;
  }

  get selectedParkingSpace(): ParkingSpace {
    return this._selectedParkingSpace;
  }

  get selectedUser(): string {
    return this._selectedUser;
  }

  get users(): User[] {
    return this._users;
  }

  set selectedUser(value: string) {
    this._selectedUser = value;
  }

  public addParkingSpace(): void {
    if (+this.number > 0) {
      const parkingSpace: ParkingSpace = {id: null, number: this.number};
      this.parkingSpaceService.createParkingSpace(parkingSpace).subscribe((ps: ParkingSpace) => {
        this._parkingSpacesWithUser.push({ parkingSpace: ps, user: null });
        this.number = '';
        this._parkingSpacesWithUser = this._parkingSpacesWithUser.sort((a, b) => {
          return +a.parkingSpace.number - +b.parkingSpace.number;
        });
        this.message = { success: true, text: `Der Parkplatz ${ps.number} wurde erfolgreich angelegt` };
      }, error => {
        // ToDo: handle error
        this.message = { success: false, text:
            'Es ist ein Fehler beim Anlegen aufgetreten. Bitte versuchen Sie es erneut' };
      });
    } else {
      this.message = { success: false, text: 'Bitte geben Sie eine Nummer ein' };
    }
  }

  public assignParkingSpace(parkingSpace: ParkingSpace): void {
    this._selectedParkingSpace = parkingSpace;
    const text = `Welchem Benutzer möchten Sie den Parkplatz ${parkingSpace.number} zuweisen?`;
    this._assignmentModalConfiguration = this.initAssignmentModalConfiguration(text);
    this.modalService.show(this._assignmentModalConfiguration.id);
  }

  public unassignParkingSpace(parkingSpaceUser: ParkingSpaceUser): void {
    this._selectedParkingSpaceUser = parkingSpaceUser;
    const text = `Möchten Sie dem Benutzer ${parkingSpaceUser.user.firstName} ${parkingSpaceUser.user.lastName} den Parkplatz
     ${parkingSpaceUser.parkingSpace.number} entziehen?`;
    this._unassignmentModalConfiguration = this.initUnassignmentModalConfiguration(text);
    this.modalService.show(this._unassignmentModalConfiguration.id);
  }

  public deleteParkingSpace(parkingSpace: ParkingSpace): void {
    this._selectedParkingSpace = parkingSpace;
    const text = `Möchten Sie den Parkplatz ${this._selectedParkingSpace.number} wirklich löschen?`;
    this._deleteParkingSpaceConfiguration = this.initDeleteParkingSpaceModalConfiguration(text);
    this.modalService.show(this._deleteParkingSpaceConfiguration.id);
  }

  public confirmAssignment(event: any): void {
    const index = this.findIndexOfUser(this._selectedUser);

    if (index > -1) {
      const user: User = this._users[index];
      user.parkingSpace = this._selectedParkingSpace;

      this.userService.updateUser(this._selectedUser, user).subscribe((response: User) => {
        let deletedUser = null;

        if (index > -1) {
          deletedUser = this._users.splice(index, 1);
        }

        // Ansicht der Parkplätze aktualisieren
        const parkingSpaceIndex = this._parkingSpacesWithUser.findIndex(searchElement => {
          return searchElement.parkingSpace.id === this._selectedParkingSpace.id;
        });

        this.updateParkingSpacesWithUser(parkingSpaceIndex, deletedUser ? deletedUser[0] : null);

        this._selectedUser = null;
        this._selectedParkingSpace = null;
      });
    }
  }

  public confirmUnassignment(event: any): void {
    const user: User = this._selectedParkingSpaceUser.user;
    user.parkingSpace = null;

    this.userService.updateUser(user.id, user).subscribe((response: User) => {
      const parkingSpaceIndex = this._parkingSpacesWithUser.findIndex(searchElement => {
        return searchElement.parkingSpace.id === this._selectedParkingSpaceUser.parkingSpace.id;
      });

      this.updateParkingSpacesWithUser(parkingSpaceIndex, null);

      this._users.push(user);

      this._selectedParkingSpaceUser = null;
    });
  }

  public confirmDelete(event: any): void {
    this.parkingSpaceService.deleteParkingSpace(this._selectedParkingSpace).subscribe((parkingSpace: ParkingSpace) => {
      const index = this._parkingSpacesWithUser.findIndex((searchElement: ParkingSpaceUser) => {
        return this._selectedParkingSpace.id === searchElement.parkingSpace.id;
      });

      if (index > -1) {
        this._parkingSpacesWithUser.splice(index, 1);
      }
    });
  }

  private initAssignmentModalConfiguration(text: string): ModalConfiguration {
    return {
      id: 'assignParkingSpace',
      title: 'Parkplatz zuweisen',
      text,
      closeText: 'speichern'
    };
  }

  private initDeleteParkingSpaceModalConfiguration(text: string): ModalConfiguration {
    return {
      id: 'deleteParkingSpace',
      title: 'Parkplatz löschen',
      text,
      closeText: 'bestätigen'
    };
  }

  private initUnassignmentModalConfiguration(text: string): ModalConfiguration {
    return {
      id: 'unassignParkingSpace',
      title: 'Parkplatz entfernen',
      text,
      closeText: 'bestätigen'
    };
  }

  private findIndexOfUser(userId: string): number {
    return this._users.findIndex((searchElement: User) => {
      return userId === searchElement.id;
    });
  }

  private updateParkingSpacesWithUser(index: number, user: User): void {
    if (index > -1) {
      const parkingSpaceWithUser = this._parkingSpacesWithUser[index];
      parkingSpaceWithUser.user = user;
      this._parkingSpacesWithUser[index] = parkingSpaceWithUser;

      this._parkingSpacesWithUser.splice(index, 1);
      this._parkingSpacesWithUser.push(parkingSpaceWithUser);
      this._parkingSpacesWithUser = this._parkingSpacesWithUser.sort((a, b) => {
        return +a.parkingSpace.number - +b.parkingSpace.number;
      });
    }
  }

}
