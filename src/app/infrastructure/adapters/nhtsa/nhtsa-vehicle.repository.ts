import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { VehicleRepositoryPort } from '../../../domain/ports/vehicle.repository.port';
import { Brand, VehicleType, VehicleModel } from '../../../domain/entities';
import {
  NhtsaApiResponse,
  NhtsaBrandDto,
  NhtsaVehicleTypeDto,
  NhtsaVehicleModelDto,
} from './nhtsa-api.dto';
import { NHTSA_API_BASE_URL, API_FORMAT } from './nhtsa-api.constants';

/**
 * Adaptador: Implementación del puerto VehicleRepositoryPort para la API NHTSA.
 */
@Injectable()
export class NhtsaVehicleRepository implements VehicleRepositoryPort {
  private readonly http = inject(HttpClient);

  getAllBrands(): Observable<Brand[]> {
    return this.http
      .get<NhtsaApiResponse<NhtsaBrandDto>>(`${NHTSA_API_BASE_URL}/GetAllMakes`, {
        params: { format: API_FORMAT },
      })
      .pipe(map((res) => (res.Results ?? []).map(this.toBrand)));
  }

  getVehicleTypesByBrandId(brandId: number): Observable<VehicleType[]> {
    return this.http
      .get<NhtsaApiResponse<NhtsaVehicleTypeDto>>(
        `${NHTSA_API_BASE_URL}/GetVehicleTypesForMakeId/${brandId}`,
        { params: { format: API_FORMAT } }
      )
      .pipe(map((res) => (res.Results ?? []).map(this.toVehicleType)));
  }

  getModelsByBrandId(brandId: number): Observable<VehicleModel[]> {
    return this.http
      .get<NhtsaApiResponse<NhtsaVehicleModelDto>>(
        `${NHTSA_API_BASE_URL}/GetModelsForMakeId/${brandId}`,
        { params: { format: API_FORMAT } }
      )
      .pipe(map((res) => (res.Results ?? []).map(this.toVehicleModel)));
  }

  private toBrand(dto: NhtsaBrandDto): Brand {
    return { id: dto.Make_ID, name: dto.Make_Name };
  }

  private toVehicleType(dto: NhtsaVehicleTypeDto): VehicleType {
    return { id: dto.VehicleTypeId, name: dto.VehicleTypeName };
  }

  private toVehicleModel(dto: NhtsaVehicleModelDto): VehicleModel {
    return {
      brandId: dto.Make_ID,
      brandName: dto.Make_Name,
      id: dto.Model_ID,
      name: dto.Model_Name,
    };
  }
}
