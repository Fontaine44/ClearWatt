import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '@shared/services/http.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent implements OnInit {
  producers: any[] = [];

  constructor(
    readonly _httpService: HttpService,
  ) { }

  ngOnInit(): void {
    this._httpService.get(`${environment.apiUrl}/producer`).subscribe((response) => {
      console.log(response);
    });
  }
}
