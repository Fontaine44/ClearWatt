import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

interface Profile {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    readonly _router: Router
  ) { }

  login(profile: Profile) {
    localStorage.setItem('profile', JSON.stringify(profile));
  }

  logout() {
    localStorage.removeItem('profile');
  }

  isLoggedIn() {
    return localStorage.getItem('profile') !== null;
  }

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(profile) : null;
  }

  loginConsumerDemo() {
    const profile = {
      name: 'John Doe',
      email: 'consumer@clearwatt.ca',
      role: 'CONSUMER'
    }
    this.login(profile);
    this._router.navigate(['/marketplace']);
  }

  loginProducerDemo() {
    const profile = {
      name: 'Jane Smith',
      email: 'producer@clearwatt.ca',
      role: 'PRODUCER'
    }
    this.login(profile);
    this._router.navigate(['/marketplace']);
  }
}
