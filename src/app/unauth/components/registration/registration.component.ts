import {MyparkApiService} from '../../../shared/services/api/mypark-api.service';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../shared/models/mypark.models';
import {Component, OnInit} from '@angular/core';
import {CommonService} from '../../../shared/services/api/common.service';

@Component({
  selector: 'mp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  private _user: User;
  private _token: string;

  constructor(private route: ActivatedRoute,
              private commonService: CommonService) {
    this._token = this.route.snapshot.paramMap.get('token');

    this.commonService.validateRegistrationToken(this._token).subscribe(response => {
      console.log('response');
    });
  }

  ngOnInit() {
  }

}
