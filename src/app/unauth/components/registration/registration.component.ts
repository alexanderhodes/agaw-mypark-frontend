import {User} from '../../../shared/models/mypark.models';
import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../../shared/models/component.models';
import {PasswordMatcher, PasswordValidator} from '../../../shared/functions/password-validator';
import {CommonService} from '../../../shared/services/api/common.service';

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

  constructor(private commonService: CommonService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      privateEmail: new FormControl('', Validators.email),
      password: new FormControl('', [Validators.required, PasswordValidator()]),
      passwordRepeat: new FormControl('', [Validators.required, PasswordValidator()])
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
        password: this.form.get('password').value,
        privateEmail: this.form.get('privateEmail').value
      };
      this.isLoading = true;

      this.commonService.register(user).subscribe((response: User) => {
        console.log('response', response);
        this.isLoading = false;
        this.form.reset();
        this.form.clearValidators();
        this.submitted = false;
        this.message = {success: true, text: 'Die Speicherung der Daten war erfolgreich.'};
      }, error => {
        this.isLoading = false;
        this.message = {
          success: false, text: 'Ihr Benutzer konnte nicht angelegt werden. Bitte prüfen Sie ihre Eingaben,' +
            'ggf. existiert bereits ein Benutzer mit dieser E-Mail Adresse.'
        };
      });
    }
  }

}
