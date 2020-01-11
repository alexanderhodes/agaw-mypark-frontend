import {User} from '../../../shared/models/mypark.models';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../../shared/models/component.models';
import {UserService} from '../../../shared/services/api/user.service';
import {PasswordMatcher, PasswordValidator} from '../../../shared/functions/password-validator';

@Component({
  selector: 'mp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public form: FormGroup;
  public message: Message;
  public isLoading: boolean;
  public submitted: boolean;

  constructor(private userService: UserService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', PasswordValidator()),
      passwordRepeat: new FormControl('', PasswordValidator())
    }, {
      validators: PasswordMatcher('password', 'passwordRepeat')
    });

    this.isLoading = false;
    this.submitted = false;
  }

  ngOnInit() {
  }

  public saveChanges(): void {
    this.submitted = true;
    console.log(this.form.get('passwordRepeat').errors);
    if (!this.form.invalid) {
      const user: User = {
        id: null,
        name: this.form.get('username').value,
        firstName: this.form.get('firstName').value,
        lastName: this.form.get('lastName').value,
        username: this.form.get('email').value,
        password: this.form.get('password').value
      };
      this.isLoading = true;

      this.userService.createUser(user).subscribe((response: User) => {
        console.log('response', response);
        this.isLoading = false;
        this.form.reset();
      });
    }
  }

}
