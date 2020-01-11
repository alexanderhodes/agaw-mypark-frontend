import { Component, OnInit } from '@angular/core';
import {ParkingSpace, User} from '../../../shared/models/mypark.models';
import {MyparkApiService} from '../../../shared/services/api/mypark-api.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../../shared/models/component.models';

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
      this.user = user;

      this.form = this.fb.group({
        firstName: new FormControl(user.firstName, Validators.required),
        lastName: new FormControl(user.lastName, Validators.required),
        username: new FormControl(user.name, Validators.required),
        email: new FormControl(user.username, [Validators.required, Validators.email]),
        password: new FormControl(''),
        passwordRepeat: new FormControl('')
      });
    });
  }

  public saveChanges(): void {
    if (!this.form.invalid) {
      const user: User = {
        id: null,
        name: this.form.get('username').value,
        firstName: this.form.get('firstName').value,
        lastName: this.form.get('lastName').value,
        username: this.form.get('email').value,
        password: null
      };

      this.apiService.updateUser(this.user.id, user).subscribe((response: User) => {
        console.log('response', response);
        this.message = { success: true, text: 'Die Speicherung der Daten war erfolgreich.' };
      });
    }
  }

}
