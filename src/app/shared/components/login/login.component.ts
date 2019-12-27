import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    let success: boolean = false;

    this.authService.login('user', 'password').subscribe(response => {
      success = response;

      if (success) {
        this.router.navigate(['/parkingspaces']);
      }
    });

  }

}
