import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { LogoComponent } from "@shared/components/logo/logo.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, LogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    readonly _router: Router,
    readonly _authService: AuthService
  ) {}

  onSubmit() {
    if (this.loginForm.valid) {
      const profile = {
        name: 'John Doe',
        email: this.loginForm.controls.email.value || 'consumer@clearwatt.ca',
        role: 'CONSUMER'
      }

      this._authService.login(profile);

      this._router.navigate(['/marketplace']);
    }
  }

  loginConsumer() {
    const profile = {
      name: 'John Doe',
      email: 'consumer@clearwatt.ca',
      role: 'CONSUMER'
    }
    this._authService.login(profile);
    this._router.navigate(['/marketplace']);
  }

  loginProducer() {
    const profile = {
      name: 'Jane Smith',
      email: 'producer@clearwatt.ca',
      role: 'PRODUCER'
    }
    this._authService.login(profile);
    this._router.navigate(['/marketplace']);
  }
}
