import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { BrandDetailComponent } from './brand-detail.component';
import { vehiclesReducer } from '../../store/vehicles.reducer';
import { VehiclesEffects } from '../../store/vehicles.effects';
import { loadBrandDetailSuccess } from '../../store/vehicles.actions';
import { Store } from '@ngrx/store';
import { provideVehicleData } from '../../../../application/providers/vehicle-data.provider';

const mockVehicleTypes = [
  { id: 2, name: 'Passenger Car' },
  { id: 7, name: 'Multipurpose Passenger Vehicle (MPV)' },
];

const mockModels = [
  { brandId: 440, brandName: 'Aston Martin', id: 1684, name: 'V8 Vantage' },
  { brandId: 440, brandName: 'Aston Martin', id: 1686, name: 'DBS' },
];

describe('BrandDetailComponent', () => {
  let component: BrandDetailComponent;
  let fixture: ComponentFixture<BrandDetailComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrandDetailComponent],
      providers: [
        provideRouter([]),
        provideStore({ vehicles: vehiclesReducer }),
        provideEffects(VehiclesEffects),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideVehicleData(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '440' },
              queryParams: { name: 'Aston Martin' },
            },
            params: { subscribe: () => {} },
          },
        },
      ],
    }).compileComponents();

    store = TestBed.inject(Store);
    store.dispatch(
      loadBrandDetailSuccess({
        brandId: 440,
        brandName: 'Aston Martin',
        vehicleTypes: mockVehicleTypes,
        models: mockModels,
      })
    );

    fixture = TestBed.createComponent(BrandDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display brand name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const h1 = compiled.querySelector('h1');
    expect(h1?.textContent?.trim()).toBe('Aston Martin');
  });

  it('should display vehicle types', () => {
    expect(component.brandDetail()).not.toBeNull();
    expect(component.brandDetail()?.vehicleTypes.length).toBe(2);
    expect(component.brandDetail()?.vehicleTypes).toEqual(mockVehicleTypes);
  });

  it('should display models', () => {
    expect(component.brandDetail()?.models.length).toBe(2);
    expect(component.brandDetail()?.models).toEqual(mockModels);
  });

  it('trackByVehicleTypeId should return id', () => {
    expect(component.trackByVehicleTypeId(0, mockVehicleTypes[0])).toBe(2);
  });

  it('trackByModelId should return id', () => {
    expect(component.trackByModelId(0, mockModels[0])).toBe(1684);
  });
});
