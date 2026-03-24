import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { GetBrandsUseCase } from '../../../application/use-cases/get-brands.use-case';
import { GetBrandDetailUseCase } from '../../../application/use-cases/get-brand-detail.use-case';
import {
  loadBrands,
  loadBrandsSuccess,
  loadBrandsFailure,
  loadBrandDetail,
  loadBrandDetailSuccess,
  loadBrandDetailFailure,
} from './vehicles.actions';

/**
 * Effects que orquesta casos de uso y despacha acciones NgRx.
 * Depende de abstracciones (use cases), no de implementaciones concretas.
 */
@Injectable()
export class VehiclesEffects {
  private readonly actions$ = inject(Actions);
  private readonly getBrandsUseCase = inject(GetBrandsUseCase);
  private readonly getBrandDetailUseCase = inject(GetBrandDetailUseCase);

  readonly loadBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBrands),
      switchMap(() =>
        this.getBrandsUseCase.execute().pipe(
          map((brands) => loadBrandsSuccess({ brands })),
          catchError((error) =>
            of(loadBrandsFailure({ error: error?.message ?? 'Error al cargar marcas' }))
          )
        )
      )
    )
  );

  readonly loadBrandDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBrandDetail),
      switchMap(({ brandId, brandName }) =>
        this.getBrandDetailUseCase.execute(brandId).pipe(
          map(({ vehicleTypes, models }) =>
            loadBrandDetailSuccess({
              brandId,
              brandName,
              vehicleTypes,
              models,
            })
          ),
          catchError((error) =>
            of(
              loadBrandDetailFailure({
                error: error?.message ?? 'Error al cargar detalle de marca',
              })
            )
          )
        )
      )
    )
  );
}
