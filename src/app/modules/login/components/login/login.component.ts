import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../../../core/services/alert.service';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService
  ) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit() {

    this.loginService.logout();
  }
  get f() {
    return this.form.controls;
  }

  async onSubmit() {
    var username = this.f['username'].value;
    var password = this.f['password'].value;
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    this.loading = true;

    if (username.toLowerCase() == 'fingent' && password == 'fingent') {
      console.log('Login Success');
      this.loading = false;
      this.loginService.login(username);
      this.alertService.success('Success');
      const returnUrl = '/home';
      this.router.navigateByUrl(returnUrl);
    } else {
      console.log('Failed');
      this.loading = false;
      this.alertService.error('Incorrect Username or Password');
    }
  }
}
