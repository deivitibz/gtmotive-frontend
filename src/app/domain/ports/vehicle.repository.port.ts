import { Observable } from 'rxjs';
import { Brand, VehicleType, VehicleModel } from '../entities';

/**
 * Puerto (Interfaz) del repositorio de vehículos.
 */
export interface VehicleRepositoryPort {
  getAllBrands(): Observable<Brand[]>;
  getVehicleTypesByBrandId(brandId: number): Observable<VehicleType[]>;
  getModelsByBrandId(brandId: number): Observable<VehicleModel[]>;
}
