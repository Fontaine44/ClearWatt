import { Injectable } from '@angular/core';

interface Profile {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
}
