import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AlertComponent } from '@shared/components/alert/alert.component';
import { MarketNavComponent } from '@shared/components/market-nav/market-nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AlertComponent, MarketNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ClearWatt';

  constructor(
    readonly _router: Router,
  ) {}
}
