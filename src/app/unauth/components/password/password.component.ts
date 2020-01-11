import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../shared/models/mypark.models';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CommonService} from '../../../shared/services/api/common.service';
import {PasswordMatcher, PasswordValidator} from '../../../shared/functions/password-validator';

@Component({
  selector: 'mp-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  private _user: User;
  private _token: string;

  public form: FormGroup;
  public submitted: boolean;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      password: new FormControl('', [Validators.required, PasswordValidator()]),
      passwordRepeat: new FormControl('', [Validators.required, PasswordValidator()])
    }, {
      validators: PasswordMatcher('password', 'passwordRepeat')
    });

    this._token = this.route.snapshot.paramMap.get('token');
    this.commonService.validatePasswordResetToken(this._token).subscribe((user: User) => {
      this._user = user;
    });
    this.submitted = false;
  }

  ngOnInit() {
  }

  get user() {
    return this._user;
  }

  public submit(): void {
    console.log(this.form.get('passwordRepeat').errors);
    this.submitted = true;
    if (!this.form.invalid) {
      const password = this.form.get('password').value;

      const body = new FormData();
      body.append('password', password);
      this.commonService.updatePasswordInPasswordReset(this._token, body).subscribe(value => {
        console.log('submitted', value);
      });
    }
  }

}
