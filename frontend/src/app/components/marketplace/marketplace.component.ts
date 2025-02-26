import { Component, OnInit } from '@angular/core';
import { HttpService } from '@shared/services/http/http.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { MarketNavComponent } from '../market-nav/market-nav.component';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [MarketNavComponent],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent implements OnInit {
  producers: any[] = [];

  constructor(
    readonly _httpService: HttpService,
    readonly _authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (!this._authService.isLoggedIn()) {
      this._authService.loginConsumerDemo();
    }
    // this._httpService.get(`${environment.apiUrl}/producer`).subscribe((response) => {
    //   console.log(response);
    // });
  }
}
