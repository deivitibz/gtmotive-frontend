import { vehiclesReducer, initialState } from './vehicles.reducer';
import {
  loadBrands,
  loadBrandsSuccess,
  loadBrandsFailure,
  loadBrandDetail,
  loadBrandDetailSuccess,
  loadBrandDetailFailure,
} from './vehicles.actions';
import { Brand, VehicleType, VehicleModel } from '../../../domain/entities';

const mockBrands: Brand[] = [
  { id: 440, name: 'Aston Martin' },
  { id: 474, name: 'Honda' },
];

const mockVehicleTypes: VehicleType[] = [
  { id: 2, name: 'Passenger Car' },
  { id: 7, name: 'Multipurpose Passenger Vehicle (MPV)' },
];

const mockModels: VehicleModel[] = [
  { brandId: 440, brandName: 'Aston Martin', id: 1684, name: 'V8 Vantage' },
  { brandId: 440, brandName: 'Aston Martin', id: 1686, name: 'DBS' },
];

describe('vehiclesReducer', () => {
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = { type: 'UNKNOWN' };
      const result = vehiclesReducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });

  describe('loadBrands', () => {
    it('should set brandsLoading to true', () => {
      const action = loadBrands();
      const result = vehiclesReducer(initialState, action);
      expect(result.brandsLoading).toBe(true);
      expect(result.brandsError).toBeNull();
    });
  });

  describe('loadBrandsSuccess', () => {
    it('should set brands and brandsLoaded', () => {
      const action = loadBrandsSuccess({ brands: mockBrands });
      const state = { ...initialState, brandsLoading: true };
      const result = vehiclesReducer(state, action);
      expect(result.brands).toEqual(mockBrands);
      expect(result.brandsLoaded).toBe(true);
      expect(result.brandsLoading).toBe(false);
      expect(result.brandsError).toBeNull();
    });
  });

  describe('loadBrandsFailure', () => {
    it('should set brandsError', () => {
      const error = 'Network error';
      const action = loadBrandsFailure({ error });
      const state = { ...initialState, brandsLoading: true };
      const result = vehiclesReducer(state, action);
      expect(result.brandsLoading).toBe(false);
      expect(result.brandsError).toBe(error);
    });
  });

  describe('loadBrandDetail (no cache)', () => {
    it('should set brandDetailLoading to true when not cached', () => {
      const action = loadBrandDetail({ brandId: 440, brandName: 'Aston Martin' });
      const result = vehiclesReducer(initialState, action);
      expect(result.brandDetailLoading).toBe(true);
      expect(result.brandDetail).toBeNull();
    });
  });

  describe('loadBrandDetail (cached)', () => {
    it('should return cached data without loading', () => {
      const cachedState = {
        ...initialState,
        brandDetailCache: {
          440: { vehicleTypes: mockVehicleTypes, models: mockModels },
        },
      };
      const action = loadBrandDetail({ brandId: 440, brandName: 'Aston Martin' });
      const result = vehiclesReducer(cachedState, action);
      expect(result.brandDetailLoading).toBe(false);
      expect(result.brandDetail).toEqual({
        brandId: 440,
        brandName: 'Aston Martin',
        vehicleTypes: mockVehicleTypes,
        models: mockModels,
      });
    });
  });

  describe('loadBrandDetailSuccess', () => {
    it('should set brandDetail and cache it', () => {
      const action = loadBrandDetailSuccess({
        brandId: 440,
        brandName: 'Aston Martin',
        vehicleTypes: mockVehicleTypes,
        models: mockModels,
      });
      const state = { ...initialState, brandDetailLoading: true };
      const result = vehiclesReducer(state, action);
      expect(result.brandDetail).toEqual({
        brandId: 440,
        brandName: 'Aston Martin',
        vehicleTypes: mockVehicleTypes,
        models: mockModels,
      });
      expect(result.brandDetailLoading).toBe(false);
      expect(result.brandDetailCache[440]).toEqual({
        vehicleTypes: mockVehicleTypes,
        models: mockModels,
      });
    });
  });

  describe('loadBrandDetailFailure', () => {
    it('should set brandDetailError', () => {
      const error = 'API error';
      const action = loadBrandDetailFailure({ error });
      const state = { ...initialState, brandDetailLoading: true };
      const result = vehiclesReducer(state, action);
      expect(result.brandDetailLoading).toBe(false);
      expect(result.brandDetailError).toBe(error);
    });
  });
});
