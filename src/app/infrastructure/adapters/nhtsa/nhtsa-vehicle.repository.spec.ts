import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { NhtsaVehicleRepository } from './nhtsa-vehicle.repository';
import { NHTSA_API_BASE_URL } from './nhtsa-api.constants';

describe('NhtsaVehicleRepository', () => {
  let repository: NhtsaVehicleRepository;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        NhtsaVehicleRepository,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    repository = TestBed.inject(NhtsaVehicleRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(repository).toBeTruthy();
  });

  describe('getAllBrands', () => {
    it('should map API response to domain entities', (done) => {
      const mockResponse = {
        Count: 2,
        Message: 'OK',
        SearchCriteria: null,
        Results: [
          { Make_ID: 440, Make_Name: 'Aston Martin' },
          { Make_ID: 474, Make_Name: 'Honda' },
        ],
      };

      repository.getAllBrands().subscribe((brands) => {
        expect(brands).toEqual([
          { id: 440, name: 'Aston Martin' },
          { id: 474, name: 'Honda' },
        ]);
        done();
      });

      const req = httpMock.expectOne((r) =>
        r.url.startsWith(`${NHTSA_API_BASE_URL}/GetAllMakes`)
      );
      expect(req.request.params.get('format')).toBe('json');
      req.flush(mockResponse);
    });
  });

  describe('getVehicleTypesByBrandId', () => {
    it('should map to domain entities', (done) => {
      const brandId = 440;
      const mockResponse = {
        Count: 2,
        Message: 'OK',
        SearchCriteria: `Make ID: ${brandId}`,
        Results: [
          { VehicleTypeId: 2, VehicleTypeName: 'Passenger Car' },
          { VehicleTypeId: 7, VehicleTypeName: 'MPV' },
        ],
      };

      repository.getVehicleTypesByBrandId(brandId).subscribe((types) => {
        expect(types).toEqual([
          { id: 2, name: 'Passenger Car' },
          { id: 7, name: 'MPV' },
        ]);
        done();
      });

      const req = httpMock.expectOne((r) =>
        r.url.includes(`GetVehicleTypesForMakeId/${brandId}`)
      );
      req.flush(mockResponse);
    });
  });

  describe('getModelsByBrandId', () => {
    it('should map to domain entities', (done) => {
      const brandId = 440;
      const mockResponse = {
        Count: 2,
        Message: 'OK',
        SearchCriteria: `MakeId:${brandId}`,
        Results: [
          { Make_ID: 440, Make_Name: 'Aston Martin', Model_ID: 1684, Model_Name: 'V8 Vantage' },
          { Make_ID: 440, Make_Name: 'Aston Martin', Model_ID: 1686, Model_Name: 'DBS' },
        ],
      };

      repository.getModelsByBrandId(brandId).subscribe((models) => {
        expect(models).toEqual([
          { brandId: 440, brandName: 'Aston Martin', id: 1684, name: 'V8 Vantage' },
          { brandId: 440, brandName: 'Aston Martin', id: 1686, name: 'DBS' },
        ]);
        done();
      });

      const req = httpMock.expectOne((r) =>
        r.url.includes(`GetModelsForMakeId/${brandId}`)
      );
      req.flush(mockResponse);
    });
  });
});
