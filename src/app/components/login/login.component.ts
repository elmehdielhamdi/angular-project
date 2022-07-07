import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  errors: string[] = [];
  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  login() {
    this.errors = [];
    if (!this.email) this.errors.push('Email required');
    if (!this.password) this.errors.push('Password required');
    if (this.errors.length) return;

    this.auth.login(this.email, this.password);
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle();
  }
}
