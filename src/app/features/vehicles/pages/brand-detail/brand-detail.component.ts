import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { loadBrandDetail } from '../../store/vehicles.actions';
import {
  selectBrandDetail,
  selectBrandDetailLoading,
  selectBrandDetailError,
} from '../../store/vehicles.selectors';

@Component({
  selector: 'app-brand-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './brand-detail.component.html',
  styleUrl: './brand-detail.component.scss',
})
export class BrandDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  brandDetail = this.store.selectSignal(selectBrandDetail);
  loading = this.store.selectSignal(selectBrandDetailLoading);
  error = this.store.selectSignal(selectBrandDetailError);

  brandId = signal<number | null>(null);
  brandName = signal<string>('');

  ngOnInit(): void {
    const snapshot = this.route.snapshot;
    const id = Number(snapshot.params['id']);
    const name = snapshot.queryParams['name'] ?? '';

    this.brandId.set(isNaN(id) ? null : id);
    this.brandName.set(name);

    if (!isNaN(id) && id > 0) {
      this.store.dispatch(
        loadBrandDetail({ brandId: id, brandName: name || `Marca ${id}` })
      );
    }

    this.route.params.subscribe((params) => {
      const newId = Number(params['id']);
      const newName = this.route.snapshot.queryParams['name'] ?? '';
      this.brandId.set(isNaN(newId) ? null : newId);
      this.brandName.set(newName);
      if (!isNaN(newId) && newId > 0) {
        this.store.dispatch(
          loadBrandDetail({ brandId: newId, brandName: newName || `Marca ${newId}` })
        );
      }
    });
  }

  trackByVehicleTypeId(_: number, item: { id: number }): number {
    return item.id;
  }

  trackByModelId(_: number, item: { id: number }): number {
    return item.id;
  }
}
