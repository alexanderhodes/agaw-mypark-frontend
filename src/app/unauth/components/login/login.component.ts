import {AuthService} from '../../../shared/services/auth/auth.service';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Message} from '../../../shared/models/component.models';

@Component({
  selector: 'mp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public message: Message;
  public isLoading: boolean;
  public submitted: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    this.submitted = false;
  }

  ngOnInit() {
    this.isLoading = false;
  }

  login(): void {
    this.submitted = true;
    if (!this.loginForm.invalid) {
      this.isLoading = true;
      const username: string = this.loginForm.get('username').value;
      const password: string = this.loginForm.get('password').value;

      this.authService.login(username, password).subscribe(response => {
        if (response) {
          this.message = {success: true, text: ''};
          this.router.navigateByUrl('/parkingspaces');
        } else {
          this.message = {success: false, text: 'Die eingegebenen Anmeldedaten sind nicht korrekt.'};
        }
        this.isLoading = false;
      }, error => {
        this.message = {success: false, text: 'Die eingegebenen Anmeldedaten sind nicht korrekt.'};
        this.isLoading = false;
      });
    }
  }

}
