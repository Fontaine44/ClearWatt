import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '@env/environment';
import { AuthService } from '@shared/services/auth/auth.service';
import { HttpService } from '@shared/services/http/http.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements OnInit {
  map?: L.Map;
  producers: Producer[] = [];
  markers: L.Marker[] = [];
  popups: L.Popup[] = [];

  constructor(
    readonly _httpService: HttpService,
    readonly _authService: AuthService,
    readonly _router: Router,
  ) { }

  ngOnInit(): void {
    // Get producers from the API
    this._httpService.get(`${environment.apiUrl}/producer`).subscribe({
      next: (response) => {
        this.producers = response.producers;
        this.markers = this.producers.map(producer => {
          return L.marker([producer.latitude, producer.longitude],
            {
              title: producer.name,
              alt: producer.name,
              icon: L.icon({
                iconUrl: producer.logo_url,
                iconSize: [48, 48],
                iconAnchor: [24, 0],
              })
            }
          );
        });

        this.popups = this.producers.map(producer => {
          return L.popup({
    
            className: 'map__popup',
            content: `<div class="poppins-bold fs-6 mb-2">${producer.name}</div>
              <div class="poppins-medium mb-2">${producer.description}</div>
              <div class="poppins-light mb-2">${producer.dollars_per_kg} kg/$</div>
              <a class="poppins-medium" href="" target="_blank">Website</a>`
          });
        });
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        this.initMap();
      }
    });
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 45.982, -73.130 ],
      zoom: 8
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    for (let i = 0; i < this.markers.length; i++) {
      const marker = this.markers[i];
      const popup = this.popups[i];

      marker.addTo(this.map).bindPopup(popup);
    }

    // If the user has clicked on a producer in the marketplace, select the marker
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    if (id) {
      this.selectMarkerById(id);
    }
  }

  selectMarkerById(id: string): void {
    const markerId = parseInt(id) - 1;
    if (markerId < this.markers.length && markerId >= 0) {
      const marker = this.markers[markerId];
      this.map?.setView(marker.getLatLng(), 12);
      marker.openPopup();
    }
  }
}
