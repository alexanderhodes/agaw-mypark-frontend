import {ParkingSpace, User} from './../../../shared/models/mypark.models';
import { Component, OnInit } from '@angular/core';
import { MyparkApiService } from 'src/app/shared/services/api/mypark-api.service';
import {ModalConfiguration} from '../../../shared/models/component.models';
import {ModalService} from '../../../shared/services/common/modal.service';

@Component({
  selector: 'mp-parkingspaces-admin',
  templateUrl: './parkingspaces-admin.component.html',
  styleUrls: ['./parkingspaces-admin.component.scss']
})
export class ParkingspacesAdminComponent implements OnInit {

  private _parkingSpaces: ParkingSpace[];
  private _users: User[];
  private _assignmentModalConfiguration: ModalConfiguration;
  private _selectedParkingSpace: ParkingSpace;
  private _selectedUser: string;

  number: string;

  constructor(private apiService: MyparkApiService, private modalService: ModalService) {
    this._parkingSpaces = [];
  }

  ngOnInit() {
    this._parkingSpaces = [];
    this._users = [];

    this.apiService.getAllParkingSpaces().subscribe((parkingSpaces: ParkingSpace[]) => {
      this._parkingSpaces = parkingSpaces;
    });

    this.apiService.getAllUsers().subscribe((users: User[]) => {
      this._users = users;
    });
  }

  get assignmentModalConfiguration(): ModalConfiguration {
    return this._assignmentModalConfiguration;
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
    const parkingSpace: ParkingSpace = { number: this.number };
    this.apiService.createParkingSpace(parkingSpace).subscribe((ps: ParkingSpace) => {
      this._parkingSpaces.push(ps);
      this.number = '';
      this._parkingSpaces = this._parkingSpaces.sort((a, b) => {
        return +a.number - +b.number;
      });
    }, error => {
      // ToDo: handle error
    });
  }

  public assignParkingSpace(parkingSpace: ParkingSpace): void {
    this._selectedParkingSpace = parkingSpace;
    const text = `Möchten Sie xyz den Parkplatz ${parkingSpace.number} zuweisen?`;
    this._assignmentModalConfiguration = this.initAssignmentModalConfiguration(text);
    this.modalService.show(this._assignmentModalConfiguration.id);
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

  private initAssignmentModalConfiguration(text: string): ModalConfiguration {
    return {
      id: 'assignParkingSpace',
      title: 'Parkplatz zuweisen',
      text,
      closeText: 'speichern'
    };
  }

  private findIndexOfUser(userId: string): number {
    return this._users.findIndex((searchElement: User) => {
      return userId === searchElement.id;
    });
  }

}
