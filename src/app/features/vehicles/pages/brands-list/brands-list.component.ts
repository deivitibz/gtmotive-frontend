import { Component, OnInit, inject, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { debounceTime, distinctUntilChanged, startWith } from 'rxjs';

import { loadBrands } from '../../store/vehicles.actions';
import {
  selectBrands,
  selectBrandsLoading,
  selectBrandsError,
  selectBrandsLoaded,
} from '../../store/vehicles.selectors';
import { Brand } from '../../../../domain/entities';

@Component({
  selector: 'app-brands-list',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ScrollingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './brands-list.component.html',
  styleUrl: './brands-list.component.scss',
})
export class BrandsListComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly router = inject(Router);

  searchControl = new FormControl('', { nonNullable: true });
  searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      startWith('')
    ),
    { initialValue: '' }
  );

  brands = this.store.selectSignal(selectBrands);
  loading = this.store.selectSignal(selectBrandsLoading);
  error = this.store.selectSignal(selectBrandsError);
  loaded = this.store.selectSignal(selectBrandsLoaded);

  filteredBrands = computed(() => {
    const brands = this.brands();
    const search = (this.searchTerm() ?? '').toLowerCase().trim();
    if (!search) return brands;
    return brands.filter((b) =>
      b.name.toLowerCase().includes(search)
    );
  });

  itemSize = 56;

  ngOnInit(): void {
    if (!this.loaded()) {
      this.store.dispatch(loadBrands());
    }
  }

  onBrandSelect(brand: Brand): void {
    this.router.navigate(['/brand', brand.id], {
      queryParams: { name: brand.name },
    });
  }

  trackByBrandId(_: number, brand: Brand): number {
    return brand.id;
  }
}
