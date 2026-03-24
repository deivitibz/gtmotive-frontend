import { createAction, props } from '@ngrx/store';
import { Brand, VehicleType, VehicleModel } from '../../../domain/entities';

/** Cargar todas las marcas */
export const loadBrands = createAction('[Vehicles] Load Brands');

export const loadBrandsSuccess = createAction(
  '[Vehicles] Load Brands Success',
  props<{ brands: Brand[] }>()
);

export const loadBrandsFailure = createAction(
  '[Vehicles] Load Brands Failure',
  props<{ error: string }>()
);

/** Cargar detalle de marca (tipos y modelos) */
export const loadBrandDetail = createAction(
  '[Vehicles] Load Brand Detail',
  props<{ brandId: number; brandName: string }>()
);

export const loadBrandDetailSuccess = createAction(
  '[Vehicles] Load Brand Detail Success',
  props<{
    brandId: number;
    brandName: string;
    vehicleTypes: VehicleType[];
    models: VehicleModel[];
  }>()
);

export const loadBrandDetailFailure = createAction(
  '[Vehicles] Load Brand Detail Failure',
  props<{ error: string }>()
);
