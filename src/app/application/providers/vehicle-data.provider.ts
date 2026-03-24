import { Provider } from '@angular/core';
import { VEHICLE_REPOSITORY } from '../di/vehicle.tokens';
import { NhtsaVehicleRepository } from '../../infrastructure/adapters/nhtsa';
import { GetBrandsUseCase } from '../use-cases/get-brands.use-case';
import { GetBrandDetailUseCase } from '../use-cases/get-brand-detail.use-case';

/**
 * Proveedor encapsulado para el módulo de datos de vehículos.
 */
export function provideVehicleData(): Provider[] {
  return [
    { provide: VEHICLE_REPOSITORY, useClass: NhtsaVehicleRepository },
    GetBrandsUseCase,
    GetBrandDetailUseCase,
  ];
}
