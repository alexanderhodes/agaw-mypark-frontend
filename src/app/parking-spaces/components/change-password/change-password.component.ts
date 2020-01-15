import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../shared/services/api/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/models/mypark.models';
import {Message} from '../../../shared/models/component.models';
import {PasswordMatcher, PasswordValidator} from '../../../shared/functions/password-validator';

@Component({
  selector: 'mp-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public form: FormGroup;
  public user: User;
  public message: Message;
  public submitted: boolean;

  constructor(
    private userService: UserService,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      oldPassword: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, PasswordValidator()]),
      passwordRepeat: new FormControl('', [Validators.required, PasswordValidator()])
    }, {
      validators: PasswordMatcher('password', 'passwordRepeat')
    });
    this.submitted = false;
  }

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user: User) => {
      this.user = user;
    });
  }

  public submit(): void {
    this.submitted = true;
    if (!this.form.invalid) {
      const oldPassword: string = this.form.get('oldPassword').value;
      const newPassword: string = this.form.get('password').value;

      const body = new FormData();
      body.append('oldPassword', oldPassword);
      body.append('newPassword', newPassword);

      this.userService.updatePassword(body).subscribe((response: User) => {
        if (response) {
          this.message = {success: true, text: 'Die Änderung war erfolgreich'};
        } else {
          this.message = {success: false, text: 'Bitte geben Sie ihr korrektes bisheriges Passwort ein.'};
        }
      }, error => this.message = {success: false, text: 'Bitte geben Sie ihr korrektes bisheriges Passwort ein.'});
    }
  }

}
