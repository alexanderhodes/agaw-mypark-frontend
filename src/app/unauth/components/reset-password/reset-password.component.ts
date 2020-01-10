import { User } from '../../../shared/models/mypark.models';
import { MyparkApiService } from '../../../shared/services/api/mypark-api.service';
import { Component, OnInit } from '@angular/core';
import {Message} from '../../../shared/models/component.models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'mp-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public message: Message;
  public form: FormGroup;

  constructor(private apiService: MyparkApiService,
              private formBuilder: FormBuilder) {
    this.message = { success: false, text: null };
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
  }

  public resetPassword(): void {
    if (!this.form.invalid) {
      const email = this.form.get('email').value;

      this.apiService.requestPasswordReset(email).subscribe((user: User) => {
        this.message = { success: true, text: 'Die Anfrage war erfolgreich.' };
        this.form.reset();
      }, error => {
        this.message = { success: false, text: 'Die eingegebene E-Mail Adresse ist nicht korrekt.' };
      });
    } else {
      this.message = { success: false, text: 'Bitte geben Sie eine korrekte E-Mail-Adresse ein.' };
    }
  }

}
