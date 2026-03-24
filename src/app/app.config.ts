import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { appReducers } from './store/app.reducer';
import { VehiclesEffects } from './features/vehicles/store/vehicles.effects';
import { provideVehicleData } from './application/providers/vehicle-data.provider';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore(appReducers),
    provideEffects(VehiclesEffects),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideVehicleData(),
  ],
};
