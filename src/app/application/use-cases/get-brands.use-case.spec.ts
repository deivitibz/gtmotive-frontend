import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { GetBrandsUseCase } from './get-brands.use-case';
import { VEHICLE_REPOSITORY } from '../di/vehicle.tokens';
import { Brand } from '../../domain/entities';

describe('GetBrandsUseCase', () => {
  let useCase: GetBrandsUseCase;

  const mockBrands: Brand[] = [
    { id: 440, name: 'Aston Martin' },
    { id: 474, name: 'Honda' },
  ];

  const mockRepository = {
    getAllBrands: () => of(mockBrands),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetBrandsUseCase,
        { provide: VEHICLE_REPOSITORY, useValue: mockRepository },
      ],
    });
    useCase = TestBed.inject(GetBrandsUseCase);
  });

  it('should be created', () => {
    expect(useCase).toBeTruthy();
  });

  it('should return brands from repository', (done) => {
    useCase.execute().subscribe((brands) => {
      expect(brands).toEqual(mockBrands);
      expect(brands.length).toBe(2);
      done();
    });
  });
});
