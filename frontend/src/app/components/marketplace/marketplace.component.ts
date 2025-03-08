import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '@shared/services/http/http.service';
import { AuthService } from '@shared/services/auth/auth.service';
import { AlertService } from '@shared/services/alert/alert.service';
import { environment } from '@env/environment';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';


@Component({
  selector: 'app-marketplace',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './marketplace.component.html',
  styleUrl: './marketplace.component.scss'
})
export class MarketplaceComponent implements OnInit {
  error: string | null = null;
  loading: boolean = true;
  producers: Producer[] = [];
  filteredProducers: Producer[] = [];
  searchTerm: string = '';
  searchSubject: Subject<string> = new Subject();
  filterSubject: Subject<void> = new Subject();
  locationSubject: Subject<void> = new Subject();
  sortOption: 'priceAsc' | 'priceDesc' | 'distanceAsc' | 'distanceDesc' = 'priceAsc';
  contractType: 'Direct Purchase' | 'PPA' = 'Direct Purchase';
  postalCode: string = '';
  postalCodeLatitude: number = 0;
  postalCodeLongitude: number = 0;
  minVolume: number | null = null;
  maxVolume: number | null = null;
  minContract: number | null = null;
  maxContract: number | null = null;
  maxPrice?: number;

  constructor(
    readonly _httpService: HttpService,
    readonly _authService: AuthService,
    readonly _alertService: AlertService,
    readonly _router: Router,
  ) {
    this.searchSubject
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
    )
    .subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });

    this.filterSubject
    .pipe(
      debounceTime(500),
    )
    .subscribe(() => {
      this.setProducers();
    });

    this.locationSubject
    .pipe(
      debounceTime(500),
    )
    .subscribe(() => {
      this.getProducersDistanceFromPostalCode();
    });
  }

  ngOnInit(): void {
    this._httpService.get(`${environment.apiUrl}/producer`).subscribe({
      next: (response) => {
        this.producers = response.producers;
        this.maxPrice = this.getMaxPrice();
        this.setProducers();
      },
      error: (error) => {
        this._alertService.danger("Error fetching producers.");
        console.error(error);
      }
    });
  }

  setProducers() {
    this.loading = true;

    this.filteredProducers = [...this.producers];

    // Contract type filter
    if (this.contractType === 'PPA') {
      this.filteredProducers = this.filteredProducers.filter(producer => producer.contract_duration);
    } else {
      this.filteredProducers = this.filteredProducers.filter(producer => producer.available_kg);
    }

    // Volume filter
    if (this.contractType === 'Direct Purchase') {
      this.filteredProducers = this.filteredProducers.filter(producer => 
        producer.available_kg >= (this.minVolume ?? Number.NEGATIVE_INFINITY) &&
        producer.available_kg <= (this.maxVolume ?? Number.POSITIVE_INFINITY)
      );    
    }

    // Contract length filter
    if (this.contractType === 'PPA') {
      this.filteredProducers = this.filteredProducers.filter(producer => 
        producer.contract_duration >= (this.minContract ?? Number.NEGATIVE_INFINITY) &&
        producer.contract_duration <= (this.maxContract ?? Number.POSITIVE_INFINITY)
      );
    }

    // Price filter
    if (this.maxPrice) {
      this.filteredProducers = this.filteredProducers.filter(producer => this.maxPrice && producer.dollars_per_kg <= this.maxPrice);
    }

    // Sort producers
    switch (this.sortOption) {
      case 'priceAsc':
        this.filteredProducers.sort((a, b) => a.dollars_per_kg - b.dollars_per_kg);
        break;
      case 'priceDesc':
        this.filteredProducers.sort((a, b) => b.dollars_per_kg - a.dollars_per_kg);
        break;
      case 'distanceAsc':
        this.filteredProducers.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
        break;
      case 'distanceDesc':
        this.filteredProducers.sort((a, b) => (b.distance ?? Infinity) - (a.distance ?? Infinity));
        break;
    }

    this.loading = false;
  }

  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  performSearch(searchTerm: string) {
    if (searchTerm === '') {
      this.setProducers();
    } else {
      // Filter producers by name (case insensitive) and split by spaces
      const searchTermLower = searchTerm.toLowerCase();
      const searchTerms = searchTermLower.split(' ');
      this.filteredProducers = this.filteredProducers.filter(producer => 
        searchTerms.some(term => producer.name.toLowerCase().includes(term))
      );
    }
  }

  onFiltersChange() {
    this.filterSubject.next();
  }

  onContractTypeChange() {
    this.minVolume = null;
    this.maxVolume = null;
    this.minContract = null;
    this.maxContract = null;
    this.setProducers();
  }

  onPostalCodeChange(postalCodeInput: any) {
    if (postalCodeInput.valid || postalCodeInput.value === '') {
      this.postalCode = postalCodeInput.value;
      this.locationSubject.next();
    }
  }

  getProducersDistanceFromPostalCode() {
    this.loading = true;
    
    this._httpService.get(`${environment.apiUrl}/producer?postalcode=${this.postalCode}`).subscribe({
      next: (response) => {
        this.producers = response.producers;
        this.sortOption = 'distanceAsc';
        this.setProducers();
      },
      error: (error) => {
        this._alertService.danger("Error fetching producers.");
        console.error(error);
      }
    });
  }

  getProducersDistanceFromPosition() {
    this.loading = true;

    this._httpService.get(`${environment.apiUrl}/producer?lat=${this.postalCodeLatitude}&lon=${this.postalCodeLongitude}`).subscribe({
      next: (response) => {
        this.producers = response.producers;
        this.sortOption = 'distanceAsc';
        this.setProducers();
      },
      error: (error) => {
        this._alertService.danger("Error fetching producers.");
        console.error(error);
      }
    });
  }

  onProducerClick(id: number) {
    this._router.navigate(['/map'], { queryParams: { id: id } });
  }

  onLocateClick() {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.postalCodeLatitude = position.coords.latitude;
          this.postalCodeLongitude = position.coords.longitude;
          this.getProducersDistanceFromPosition();
          this.setPostalCodeFromLocation();
          this.error = null;
        },
        (err) => {
          this.error = "Location access denied or unavailable.";
          this._alertService.danger(this.error);
          console.error(err);
        }
      );
    } else {
      this.error = "Geolocation is not supported by this browser.";
      this._alertService.danger(this.error);
    }
  }

  setPostalCodeFromLocation() {
    this._httpService.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.postalCodeLatitude}&lon=${this.postalCodeLongitude}`).subscribe({
      next: (response) => {
        this.postalCode = response.address.postcode;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  getMaxPrice(): number {
    return Math.max(...this.producers.map(producer => producer.dollars_per_kg));
  }

  isVolumeInvalid(): boolean {
    return !!(this.minVolume && this.maxVolume && this.minVolume > this.maxVolume);
  }

  isContractInvalid(): boolean {
    return !!(this.minContract && this.maxContract && this.minContract > this.maxContract);
  }
}
