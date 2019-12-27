import { User } from './../../models/mypark.models';
import { MyparkApiService } from './../../services/api/mypark-api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mp-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  email: string = '';

  constructor(private apiService: MyparkApiService) { }

  ngOnInit() {
  }

  resetPassword() {
    this.apiService.requestPasswordReset(this.email).subscribe((user: User) => {
      console.log(user);
    });
  }

}
