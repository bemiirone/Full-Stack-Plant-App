import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlantState } from './plant.reducer';
import { Plant } from '../plant.interface';

// Select the entire plants state
export const selectPlantState = createFeatureSelector<PlantState>('plants');

// Select the plants array from the plants state
export const selectPlants = createSelector(
  selectPlantState,
  (state: PlantState) => state.plants
);

// Select a specific plant by ID from the plants state
export const selectPlantById = createSelector(
  selectPlantState,
  (state: PlantState, props: { _id: string }) => state.plants.find(plant => plant._id === props._id)
);

// Select multiple plants by an array of IDs from the plants state
export const selectPlantsByIds = createSelector(
  selectPlants,  // This should return the entire plants state array
  (plants: Plant[], props: { ids: number[] }) => plants.filter(plant => props.ids.includes(plant.id))
);

// Select the loading status from the plants state
export const selectLoading = createSelector(
  selectPlantState,
  (state: PlantState) => state.loading
);

// Select the error message from the plants state
export const selectError = createSelector(
  selectPlantState,
  (state: PlantState) => state.error
);
