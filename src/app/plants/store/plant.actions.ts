import { createAction, props } from '@ngrx/store';
import { Plant } from '../plant.interface';

export const loadPlants = createAction(
  '[Plant] Load Plants',
  props<{ limit?: number; offset?: number }>()
);

export const loadPlantsSuccess = createAction(
  '[Plant] Load Plants Success',
  props<{ plants: Plant[] }>()
);

export const loadPlantsFailure = createAction(
  '[Plant] Load Plants Failure',
  props<{ error: any }>()
);

export const loadPlant = createAction(
  '[Plant] Load Single Plant',
  props<{ id: string }>()
);

export const loadPlantSuccess = createAction(
  '[Plant] Load Single Plant Success',
  props<{ plant: Plant }>()
);

export const loadPlantFailure = createAction(
  '[Plant] Load Single Plant Failure',
  props<{ error: any }>()
);

export const addPlant = createAction(
  '[Plant] Add Plant',
  props<{ plant: Plant }>()
);

export const addPlantSuccess = createAction(
  '[Plant] Add Plant Success',
  props<{ plant: Plant }>()
);

export const addPlantFailure = createAction(
  '[Plant] Add Plant Failure',
  props<{ error: any }>()
);

export const updatePlant = createAction(
  '[Plant] Update Plant',
  props<{ plant: Plant }>()
);

export const updatePlantSuccess = createAction(
  '[Plant] Update Plant Success',
  props<{ plant: Plant }>()
);

export const updatePlantFailure = createAction(
  '[Plant] Update Plant Failure',
  props<{ error: any }>()
);

export const deletePlant = createAction(
  '[Plant] Delete Plant',
  props<{ id: number }>()
);

export const deletePlantSuccess = createAction(
  '[Plant] Delete Plant Success',
  props<{ id: number }>()
);

export const deletePlantFailure = createAction(
  '[Plant] Delete Plant Failure',
  props<{ error: any }>()
);
