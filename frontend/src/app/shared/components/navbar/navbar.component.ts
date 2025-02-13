import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  isLoggedIn = false;
  profile: any = null;

  constructor(readonly _authService: AuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = this._authService.isLoggedIn();
    this.profile = this._authService.getProfile();
  }

  logout(): void {
    this._authService.logout();
    this.isLoggedIn = false;
    this.profile = null;
  }
}
