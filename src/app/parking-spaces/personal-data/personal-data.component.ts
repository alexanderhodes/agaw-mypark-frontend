import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/mypark.models';
import {MyparkApiService} from '../../shared/services/api/mypark-api.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'mp-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  public form: FormGroup;
  public user: User;
  public success: boolean;
  public message: string;

  constructor(
    private apiService: MyparkApiService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.apiService.getCurrentUser().subscribe((user: User) => {
      console.log('currentUser', user);
      this.user = user;
    });
  }

  saveChanges() {
    // ToDo: validate changed
    this.apiService.updateUser(this.user.id, this.user).subscribe((response: User) => {
      console.log('response', response);
      this.success = true;
      this.message = 'Die Speicherung der Daten war erfolgreich.';
    });
  }

}
