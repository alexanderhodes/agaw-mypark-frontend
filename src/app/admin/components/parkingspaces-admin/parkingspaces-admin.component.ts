import {ParkingSpace, User} from './../../../shared/models/mypark.models';
import { Component, OnInit } from '@angular/core';
import { MyparkApiService } from 'src/app/shared/services/api/mypark-api.service';
import {Message, ModalConfiguration} from '../../../shared/models/component.models';
import {ModalService} from '../../../shared/services/common/modal.service';

@Component({
  selector: 'mp-parkingspaces-admin',
  templateUrl: './parkingspaces-admin.component.html',
  styleUrls: ['./parkingspaces-admin.component.scss']
})
export class ParkingspacesAdminComponent implements OnInit {

  public number: string;
  public isLoading: boolean;
  public message: Message;

  private _parkingSpaces: ParkingSpace[];
  private _users: User[];
  private _assignmentModalConfiguration: ModalConfiguration;
  private _deleteParkingSpaceConfiguration: ModalConfiguration;
  private _selectedParkingSpace: ParkingSpace;
  private _selectedUser: string;

  constructor(private apiService: MyparkApiService, private modalService: ModalService) {
    this._parkingSpaces = [];
    this.isLoading = false;
    this.message = { success: false, text: null };
  }

  ngOnInit() {
    this.isLoading = true;
    this._parkingSpaces = [];
    this._users = [];

    this.apiService.getAllParkingSpaces().subscribe((parkingSpaces: ParkingSpace[]) => {
      this._parkingSpaces = parkingSpaces;
      this.isLoading = false;
    });

    this.apiService.getAllUsers().subscribe((users: User[]) => {
      this._users = users;
    });

    this.apiService.getUsersWithParkingSpace().subscribe((users => console.log('with ps', users)));
  }

  get assignmentModalConfiguration(): ModalConfiguration {
    return this._assignmentModalConfiguration;
  }

  get deleteParkingSpaceConfiguration(): ModalConfiguration {
    return this._deleteParkingSpaceConfiguration;
  }

  get parkingSpaces(): ParkingSpace[] {
    return this._parkingSpaces;
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
      this.apiService.createParkingSpace(parkingSpace).subscribe((ps: ParkingSpace) => {
        this._parkingSpaces.push(ps);
        this.number = '';
        this._parkingSpaces = this._parkingSpaces.sort((a, b) => {
          return +a.number - +b.number;
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

  public deleteParkingSpace(parkingSpace: ParkingSpace): void {
    this._selectedParkingSpace = parkingSpace;
    const text = `Möchten Sie den Parkplatz ${this._selectedParkingSpace.number} wirklich löschen?`;
    this._deleteParkingSpaceConfiguration = this.initDeleteParkingSpaceModalConfiguration(text);
    this.modalService.show(this._deleteParkingSpaceConfiguration.id);
  }

  public confirmAssignment(event: any): void {
    // ToDo: send request to backend with user
    console.log('confirmed assignment', this._selectedParkingSpace, this._selectedUser);

    const index = this.findIndexOfUser(this._selectedUser);

    if (index > -1) {
      const user: User = this._users[index];
      user.parkingSpace = this._selectedParkingSpace;

      console.log('user', user);

      this.apiService.updateUser(this._selectedUser, user).subscribe((response: User) => {
        console.log('user-response', response);

        if (index > -1) {
          this._users.splice(index, 1);
        }

        // ToDo: Übersicht der Parkplätze aktualisieren

        this._selectedUser = null;
        this._selectedParkingSpace = null;
      });
    }
  }

  public confirmDelete(event: any): void {
    this.apiService.deleteParkingSpace(this._selectedParkingSpace).subscribe((parkingSpace: ParkingSpace) => {
      const index = this._parkingSpaces.findIndex((searchElement: ParkingSpace) => {
        return this._selectedParkingSpace.id === searchElement.id;
      });

      if (index > -1) {
        this._parkingSpaces.splice(index, 1);
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

  private findIndexOfUser(userId: string): number {
    return this._users.findIndex((searchElement: User) => {
      return userId === searchElement.id;
    });
  }

}
