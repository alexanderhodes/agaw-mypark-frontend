import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'mp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public message: string;
  public success: boolean;
  public isLoading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
      this.loginForm = this.fb.group({
        username:  ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {
    this.isLoading = false;
  }

  login(): void {
    this.isLoading = true;
    const username: string = this.loginForm.get('username').value;
    const password: string = this.loginForm.get('password').value;

    this.authService.login(username, password).subscribe(response => {
      this.success = response;

      if (this.success) {
        this.message = '';
        this.router.navigateByUrl('/parkingspaces');
      } else {
        this.message = 'Die eingegebenen Anmeldedaten sind nicht korrekt';
      }
      this.isLoading = false;
    }, error => {
      this.success = false;
      this.message = 'Die eingegebenen Anmeldedaten sind nicht korrekt';
      this.isLoading = false;
    });

  }

}
