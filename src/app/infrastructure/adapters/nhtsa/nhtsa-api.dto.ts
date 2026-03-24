/**
 * DTOs de la API NHTSA vPIC.
 * Solo la capa de infraestructura conoce esta estructura.
 */

export interface NhtsaApiResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: T[];
}

/** DTO para marca - la API NHTSA usa Make_ID/Make_Name en la respuesta */
export interface NhtsaBrandDto {
  Make_ID: number;
  Make_Name: string;
}

export interface NhtsaVehicleTypeDto {
  VehicleTypeId: number;
  VehicleTypeName: string;
}

export interface NhtsaVehicleModelDto {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}
