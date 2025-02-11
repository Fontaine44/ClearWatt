import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MarketplaceComponent } from './components/marketplace/marketplace.component';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'marketplace',
    loadComponent: () => import('./components/marketplace/marketplace.component').then(m => m.MarketplaceComponent)
  },
  {
    path: 'map',
    loadComponent: () => import('./components/map/map.component').then(m => m.MapComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '**',
    redirectTo: '',
  }
];
