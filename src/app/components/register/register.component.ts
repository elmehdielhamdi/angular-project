import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  errors: string[] = [];

  constructor(private auth: AuthService) {}

  ngOnInit(): void {}

  register() {
    this.errors = [];
    if (!this.email) this.errors.push('Email required');
    if (!this.password) this.errors.push('Password required');
    if (this.errors.length) return;

    this.auth.register(this.email, this.password);
  }

  signInWithGoogle() {
    this.auth.signInWithGoogle();
  }
}
