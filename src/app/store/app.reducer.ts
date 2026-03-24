import { ActionReducerMap } from '@ngrx/store';
import { vehiclesReducer, VehiclesState } from '../features/vehicles/store/vehicles.reducer';

/**
 * Estado global de la aplicación.
 */
export interface AppState {
  vehicles: VehiclesState;
}

/**
 * Mapa de reducers raíz.
 */
export const appReducers: ActionReducerMap<AppState> = {
  vehicles: vehiclesReducer,
};
