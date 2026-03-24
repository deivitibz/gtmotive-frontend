import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/vehicles/pages/brands-list/brands-list.component').then(m => m.BrandsListComponent) },
  { path: 'brand/:id', loadComponent: () => import('./features/vehicles/pages/brand-detail/brand-detail.component').then(m => m.BrandDetailComponent) },
  { path: '**', redirectTo: '' },
];
