import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { BrandsListComponent } from './brands-list.component';
import { vehiclesReducer } from '../../store/vehicles.reducer';
import { VehiclesEffects } from '../../store/vehicles.effects';
import { loadBrandsSuccess } from '../../store/vehicles.actions';
import { Store } from '@ngrx/store';
import { provideVehicleData } from '../../../../application/providers/vehicle-data.provider';

const mockBrands = [
  { id: 440, name: 'Aston Martin' },
  { id: 474, name: 'Honda' },
  { id: 480, name: 'Toyota' },
];

describe('BrandsListComponent', () => {
  let component: BrandsListComponent;
  let fixture: ComponentFixture<BrandsListComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandsListComponent],
      providers: [
        provideRouter([]),
        provideStore({ vehicles: vehiclesReducer }),
        provideEffects(VehiclesEffects),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideVehicleData(),
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    store.dispatch(loadBrandsSuccess({ brands: mockBrands }));

    fixture = TestBed.createComponent(BrandsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display brands from store', () => {
    expect(component.filteredBrands().length).toBe(3);
    expect(component.filteredBrands()).toEqual(mockBrands);
  });

  it('should filter brands by search term', (done) => {
    component.searchControl.setValue('Honda');
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      expect(component.filteredBrands().length).toBe(1);
      expect(component.filteredBrands()[0].name).toBe('Honda');
      done();
    }, 250);
  });

  it('should filter brands case-insensitively', (done) => {
    component.searchControl.setValue('honda');
    fixture.detectChanges();
    setTimeout(() => {
      fixture.detectChanges();
      expect(component.filteredBrands().length).toBe(1);
      expect(component.filteredBrands()[0].name).toBe('Honda');
      done();
    }, 250);
  });

  it('should show all brands when search is empty', (done) => {
    component.searchControl.setValue('Honda');
    fixture.detectChanges();
    setTimeout(() => {
      component.searchControl.setValue('');
      fixture.detectChanges();
      setTimeout(() => {
        fixture.detectChanges();
        expect(component.filteredBrands().length).toBe(3);
        done();
      }, 250);
    }, 250);
  });

  it('trackByBrandId should return id', () => {
    const brand = mockBrands[0];
    expect(component.trackByBrandId(0, brand)).toBe(440);
  });
});
