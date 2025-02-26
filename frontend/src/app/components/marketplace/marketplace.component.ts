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
    if (!this._authService.isLoggedIn()) {
      this._authService.loginConsumerDemo();
    }

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

  onProducerClick(id: number) {
    this._router.navigate(['/map'], { queryParams: { id: id } });
  }
}
