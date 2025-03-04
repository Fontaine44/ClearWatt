import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpService } from '@shared/services/http/http.service';
import { AuthService } from '@shared/services/auth/auth.service';
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
  producers: Producer[] = [];
  filteredProducers: Producer[] = [];
  searchTerm: string = '';
  searchSubject: Subject<string> = new Subject();
  sortOption: 'priceAsc' | 'priceDesc' | 'distanceAsc' | 'distanceDesc' | 'volAsc' | 'volDesc' = 'priceAsc';
  contractType: 'Direct purchase' | 'PPA' = 'Direct purchase';
  postalCode: string = '';
  minVolume: number | null = null;
  maxVolume: number | null = null;
  minPrice: number | null = null;
  maxPrice: number | null = null;

  constructor(
    readonly _httpService: HttpService,
    readonly _authService: AuthService,
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
  }

  ngOnInit(): void {
    this._httpService.get(`${environment.apiUrl}/producer`).subscribe({
      next: (response) => {
        this.producers = response.producers;
        this.filteredProducers = [...this.producers];
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onSearchChange(searchTerm: string) {
    this.searchSubject.next(searchTerm);
  }

  performSearch(searchTerm: string) {
    if (searchTerm === '') {
      this.filteredProducers = [...this.producers];
    } else {
      // Filter producers by name (case insensitive) and split by spaces
      const searchTermLower = searchTerm.toLowerCase();
      const searchTerms = searchTermLower.split(' ');
      this.filteredProducers = this.producers.filter(producer => 
        searchTerms.some(term => producer.name.toLowerCase().includes(term))
      );
    }
  }

  onSortChange() {
    console.log('Sort changed');
  }

  onProducerClick(id: number) {
    this._router.navigate(['/map'], { queryParams: { id: id } });
  }

  onContractTypeChange() {
    console.log(this.contractType);
  }

  onPostalCodeChange() {
    console.log('Postal code changed');
  }

  onVolumeChange() {
    console.log('Volume changed');
  }

  onPriceChange() {
    console.log('Price changed');
    console.log(this.minPrice, this.maxPrice);
  }

  onLocateClick() {
    console.log('Find location clicked');
  }
}
