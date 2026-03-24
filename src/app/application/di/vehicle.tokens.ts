import { InjectionToken } from '@angular/core';
import { VehicleRepositoryPort } from '../../domain/ports/vehicle.repository.port';

/**
 * Token de inyección para el repositorio de vehículos.
 */
export const VEHICLE_REPOSITORY = new InjectionToken<VehicleRepositoryPort>(
  'VehicleRepository'
);
