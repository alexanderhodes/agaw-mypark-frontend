import { Component, OnInit } from '@angular/core';
import {User} from '../../shared/models/mypark.models';
import {MyparkApiService} from '../../shared/services/api/mypark-api.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Message} from '../../shared/models/component.models';

@Component({
  selector: 'mp-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  public form: FormGroup;
  public user: User;
  public message: Message;

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
      this.message = { success: true, text: 'Die Speicherung der Daten war erfolgreich.' };
    });
  }

}
