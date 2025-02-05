import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../../shared/services/http.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  status = false;

  constructor(readonly _httpService: HttpService) { }

  ngOnInit() {
    this._httpService.get(environment.apiUrl).subscribe((data) => {
      console.log(data);
      this.status = data.status;
    });
  }
}
