import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './../../../models/mypark.models';
import { MyparkApiService } from './../../../services/api/mypark-api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'mp-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  private _user: User;
  private _token: string;
  form: FormGroup;

  constructor(private route: ActivatedRoute,
              private apiService: MyparkApiService,
              private fb: FormBuilder) {
    this.form = this.fb.group({
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    });

    this._token = this.route.snapshot.paramMap.get('token');
    this.apiService.validatePasswordResetToken(this._token).subscribe((user: User) => {
      this._user = user;
    });
  }

  ngOnInit() {
  }

  get user() {
    return this._user;
  }

  submit() {
    // ToDo: implement validation
    const password = this.form.get('password').value;

    const body = new FormData();
    body.append('password', password);
    this.apiService.updatePasswordInPasswordReset(this._token, body).subscribe(value => {
      console.log('submitted', value);
    });
  }

}
