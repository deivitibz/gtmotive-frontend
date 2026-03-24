import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../../domain/entities';
import { VEHICLE_REPOSITORY } from '../di/vehicle.tokens';
import { VehicleRepositoryPort } from '../../domain/ports/vehicle.repository.port';

/**
 * Caso de uso: Obtener todas las marcas.
*/
@Injectable()
export class GetBrandsUseCase {
  private readonly repository = inject(VEHICLE_REPOSITORY) as VehicleRepositoryPort;

  execute(): Observable<Brand[]> {
    return this.repository.getAllBrands();
  }
}
