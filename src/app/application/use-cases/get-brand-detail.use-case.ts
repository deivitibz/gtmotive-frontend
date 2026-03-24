import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { VehicleType, VehicleModel } from '../../domain/entities';
import { VEHICLE_REPOSITORY } from '../di/vehicle.tokens';
import { VehicleRepositoryPort } from '../../domain/ports/vehicle.repository.port';

export interface BrandDetailResult {
  vehicleTypes: VehicleType[];
  models: VehicleModel[];
}

/**
 * Caso de uso: Obtener detalle de una marca (tipos y modelos).
 */
@Injectable()
export class GetBrandDetailUseCase {
  private readonly repository = inject(VEHICLE_REPOSITORY) as VehicleRepositoryPort;

  execute(brandId: number): Observable<BrandDetailResult> {
    return forkJoin({
      vehicleTypes: this.repository.getVehicleTypesByBrandId(brandId),
      models: this.repository.getModelsByBrandId(brandId),
    });
  }
}
