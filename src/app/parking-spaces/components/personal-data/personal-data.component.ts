import {Component, OnInit} from '@angular/core';
import {User} from '../../../shared/models/mypark.models';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../../shared/models/component.models';
import {UserService} from '../../../shared/services/api/user.service';

@Component({
  selector: 'mp-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {

  public form: FormGroup;
  public user: User;
  public message: Message;
  public submitted: boolean;

  constructor(
    private userService: UserService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      privateEmail: new FormControl('', Validators.email)
    });
    this.submitted = false;
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user: User) => {
      this.user = user;

      this.form = this.fb.group({
        firstName: new FormControl(user.firstName, Validators.required),
        lastName: new FormControl(user.lastName, Validators.required),
        username: new FormControl(user.name, Validators.required),
        email: new FormControl(user.username, [Validators.required, Validators.email]),
        privateEmail: new FormControl(user.privateEmail, Validators.email)
      });
    });
  }

  public saveChanges(): void {
    this.submitted = true;
    if (!this.form.invalid) {
      const user: User = {
        id: null,
        name: this.form.get('username').value,
        firstName: this.form.get('firstName').value,
        lastName: this.form.get('lastName').value,
        username: this.form.get('email').value,
        privateEmail: this.form.get('privateEmail').value,
        password: null
      };

      this.userService.updateUser(this.user.id, user).subscribe((response: User) => {
        console.log('response', response);
        this.message = { success: true, text: 'Die Speicherung der Daten war erfolgreich.' };
      });
    }
  }

}
