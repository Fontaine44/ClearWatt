import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent implements AfterViewInit {
  map?: L.Map;
  listMode = false;
  markers: Marker[] = [
    {
      id: 0,
      location: [45.47884, -73.59793],
      icon: 'fuel_cell.png',
      name: 'Fuel Cell Energy',
      description: 'FuelCell Energy is enabling a world empowered by clean energy with a platform based on fuel cell technology.',
      website: 'https://fuelcellenergy.com'
    },
    {
      id: 1,
      location: [45.495028, -73.557479],
      icon: 'marker.png',
      name: 'Red Hydrogen',
      description: 'Red Hydrogen is a company that produces hydrogen fuel cells for a variety of applications.',
      website: 'https://www.greencars.com/greencars-101/red-hydrogen-how-it-works'
    },
    {
      id: 2,
      location: [45.4300, -73.59793],
      icon: 'fuel_cell.png',
      name: 'Fuel Cell Energy',
      description: 'FuelCell Energy is enabling a world empowered by clean energy with a platform based on fuel cell technology.',
      website: 'https://fuelcellenergy.com'
    },
    {
      id: 3,
      location: [45.46000, -73.569279],
      icon: 'marker.png',
      name: 'Red Hydrogen',
      description: 'Red Hydrogen is a company that produces hydrogen fuel cells for a variety of applications.',
      website: 'https://www.greencars.com/greencars-101/red-hydrogen-how-it-works'
    },
  ];

  ngAfterViewInit(): void {
    this.initMap();
  }

  public toggleListMode(listMode: boolean) {
    this.listMode = listMode;
    if (!listMode) this.initMap()
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

    const icons = { // you can replace with your exact image paths
      iconUrl: 'marker.png',
      iconRetinaUrl: 'marker.png',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      shadowSize: [0, 0],
      imagePath: './'
    }
    L.Icon.Default.mergeOptions(icons);

    for (const marker of this.markers) {
      const popup = L.popup({
        className: 'map__popup',
        content: `<div class="poppins-bold fs-6">${marker.name}</div>
          <div class="poppins-medium my-1">${marker.description}</div>
          <a class="poppins-medium" href="${marker.website}" target="_blank">Website</a>`
      });

      L.marker(
        marker.location, {
          title: marker.name,
          alt: marker.name,
          icon: L.icon({
            iconUrl: marker.icon,
            iconSize: [36, 36],
            iconAnchor: [18, 0],
          })
      }).addTo(this.map)
      .bindPopup(
        popup
      );
    }
  }
}
