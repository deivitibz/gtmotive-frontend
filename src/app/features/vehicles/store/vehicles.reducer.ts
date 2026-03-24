import { createReducer, on } from '@ngrx/store';
import {
  loadBrands,
  loadBrandsSuccess,
  loadBrandsFailure,
  loadBrandDetail,
  loadBrandDetailSuccess,
  loadBrandDetailFailure,
} from './vehicles.actions';
import { Brand, VehicleType, VehicleModel } from '../../../domain/entities';

export interface VehiclesState {
  brands: Brand[];
  brandsLoaded: boolean;
  brandsLoading: boolean;
  brandsError: string | null;

  brandDetail: {
    brandId: number;
    brandName: string;
    vehicleTypes: VehicleType[];
    models: VehicleModel[];
  } | null;
  brandDetailLoading: boolean;
  brandDetailError: string | null;

  brandDetailCache: Record<
    number,
    { vehicleTypes: VehicleType[]; models: VehicleModel[] }
  >;
}

export const initialState: VehiclesState = {
  brands: [],
  brandsLoaded: false,
  brandsLoading: false,
  brandsError: null,
  brandDetail: null,
  brandDetailLoading: false,
  brandDetailError: null,
  brandDetailCache: {},
};

export const vehiclesReducer = createReducer(
  initialState,

  on(loadBrands, (state) => ({
    ...state,
    brandsLoading: true,
    brandsError: null,
  })),

  on(loadBrandsSuccess, (state, { brands }) => ({
    ...state,
    brands,
    brandsLoaded: true,
    brandsLoading: false,
    brandsError: null,
  })),

  on(loadBrandsFailure, (state, { error }) => ({
    ...state,
    brandsLoading: false,
    brandsError: error,
  })),

  on(loadBrandDetail, (state, { brandId, brandName }) => {
    const cached = state.brandDetailCache[brandId];
    if (cached) {
      return {
        ...state,
        brandDetail: {
          brandId,
          brandName,
          vehicleTypes: cached.vehicleTypes,
          models: cached.models,
        },
        brandDetailLoading: false,
        brandDetailError: null,
      };
    }
    return {
      ...state,
      brandDetail: null,
      brandDetailLoading: true,
      brandDetailError: null,
    };
  }),

  on(loadBrandDetailSuccess, (state, { brandId, brandName, vehicleTypes, models }) => ({
    ...state,
    brandDetail: { brandId, brandName, vehicleTypes, models },
    brandDetailLoading: false,
    brandDetailError: null,
    brandDetailCache: {
      ...state.brandDetailCache,
      [brandId]: { vehicleTypes, models },
    },
  })),

  on(loadBrandDetailFailure, (state, { error }) => ({
    ...state,
    brandDetailLoading: false,
    brandDetailError: error,
  }))
);
