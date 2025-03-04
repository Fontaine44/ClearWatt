import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpService } from '@shared/services/http/http.service';
import { NavbarComponent } from '@shared/components/navbar/navbar.component';
import { LogoComponent } from '@shared/components/logo/logo.component';
import { AuthService } from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NavbarComponent, LogoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  status = false;

  constructor(
    readonly _httpService: HttpService,
    readonly _route: ActivatedRoute,
    readonly _authService: AuthService,
  ) { }

  ngOnInit() {
    this._route.fragment.subscribe((fragment: string | null) => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView();
        }
      }
    });
  }

  ngAfterViewInit(): void {
    const popoverTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="popover"]'));
    popoverTriggerList.forEach(popoverTriggerEl => new (window as any).bootstrap.Popover(popoverTriggerEl));
  }
}
