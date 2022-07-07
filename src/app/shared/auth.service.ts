import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Toastify from 'toastify-js';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  async login(email: string, password: string) {
    try {
      const res = await this.fireauth.signInWithEmailAndPassword(
        email,
        password
      );
      localStorage.setItem(
        'user',
        JSON.stringify({ email: res.user?.email, photo: res.user?.photoURL })
      );
      this.router.navigate(['recipes']);
    } catch (err: any) {
      showErrorToast(getMessage(err.message));
    }
  }

  async register(email: string, password: string) {
    try {
      const res = await this.fireauth.createUserWithEmailAndPassword(
        email,
        password
      );
      localStorage.setItem(
        'user',
        JSON.stringify({ email: res.user?.email, photo: res.user?.photoURL })
      );
      this.router.navigate(['/login']);
    } catch (err: any) {
      showErrorToast(getMessage(err.message));
    }
  }

  async logout() {
    try {
      await this.fireauth.signOut();
      localStorage.removeItem('user');
      this.router.navigate(['/login']);
    } catch (err: any) {
      showErrorToast(getMessage(err.message));
    }
  }

  async signInWithGoogle() {
    try {
      const res = await this.fireauth.signInWithPopup(new GoogleAuthProvider());
      localStorage.setItem(
        'user',
        JSON.stringify({ email: res.user?.email, photo: res.user?.photoURL })
      );
      this.router.navigate(['recipes']);
    } catch (err) {}
  }
}

function getMessage(error: string): string {
  return error.replace('Firebase: ', '').replace(/\(auth.*\)\.?/, '');
}

function showErrorToast(message: string) {
  Toastify({
    text: message,
    duration: 5000,
    style: {
      background: '#e74c3c',
    },
  }).showToast();
}
