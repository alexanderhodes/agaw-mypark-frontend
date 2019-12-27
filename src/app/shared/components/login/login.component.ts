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
  public result: string;

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
  }

  login(): void {

    this.authService.login(
      this.loginForm.get('username').value,
      this.loginForm.get('password').value
      ).subscribe(response => {
      const success: boolean = response;
      console.log('success', success);

      if (success) {
        this.result = '';
        this.router.navigate(['/parkingspaces']);
      } else {
        this.result = 'Die eingegebenen Anmeldedaten sind nicht korrekt';
      }
    });

  }

}
