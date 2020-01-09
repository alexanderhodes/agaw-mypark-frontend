import { User } from './../../models/mypark.models';
import { MyparkApiService } from './../../services/api/mypark-api.service';
import { Component, OnInit } from '@angular/core';
import {Message} from '../../models/component.models';

@Component({
  selector: 'mp-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  public email: string;
  public message: Message;

  constructor(private apiService: MyparkApiService) {
    this.message = { success: false, text: null };
    this.email = '';
  }

  ngOnInit() {
  }

  resetPassword() {
    this.apiService.requestPasswordReset(this.email).subscribe((user: User) => {
      this.message = { success: true, text: 'Die Anfrage war erfolgreich.' };
    }, error => {
      this.message = { success: false, text: 'Die eingebene E-Mail Adresse ist nicht korrekt.' };
    });
    this.email = '';
  }

}
