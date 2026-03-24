import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VehiclesState } from './vehicles.reducer';

export const selectVehiclesState = createFeatureSelector<VehiclesState>('vehicles');

export const selectBrands = createSelector(
  selectVehiclesState,
  (state) => state.brands
);

export const selectBrandsLoaded = createSelector(
  selectVehiclesState,
  (state) => state.brandsLoaded
);

export const selectBrandsLoading = createSelector(
  selectVehiclesState,
  (state) => state.brandsLoading
);

export const selectBrandsError = createSelector(
  selectVehiclesState,
  (state) => state.brandsError
);

export const selectBrandDetail = createSelector(
  selectVehiclesState,
  (state) => state.brandDetail
);

export const selectBrandDetailLoading = createSelector(
  selectVehiclesState,
  (state) => state.brandDetailLoading
);

export const selectBrandDetailError = createSelector(
  selectVehiclesState,
  (state) => state.brandDetailError
);
