import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    this.authService.login("user", "password").subscribe(resp => {
      console.log("response:");
      console.log(resp);
      const keys = resp.headers.keys();
      keys.map(key =>
        console.log(`${key}: ${resp.headers.get(key)}`));
        console.log("auth", resp.headers.get('Authorization'));
      console.log(resp.body);
    });
    // this.authService.loggedIn = true;
    // this.router.navigate(['/parkingspaces']);
  }

}
