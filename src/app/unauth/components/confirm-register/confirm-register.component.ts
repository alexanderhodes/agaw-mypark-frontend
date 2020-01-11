import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../shared/services/api/common.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../shared/models/mypark.models';

@Component({
  selector: 'mp-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.scss']
})
export class ConfirmRegisterComponent implements OnInit {

  private _token: string;
  public user: User;
  public isLoading: boolean;

  constructor(private commonService: CommonService, private route: ActivatedRoute) {
    this._token = this.route.snapshot.paramMap.get('token');
    this.isLoading = true;
  }

  ngOnInit() {
    if (this._token && this._token.length > 0) {
      this.commonService.validateRegistrationToken(this._token).subscribe((response: User) => {
        console.log('response');
        this.user = response;
        this.isLoading = false;
      }, error => this.isLoading = false);
    }
  }

}
