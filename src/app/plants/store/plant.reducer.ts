import { Action, createReducer, on } from '@ngrx/store';
import { 
  loadPlants, loadPlantsSuccess, loadPlantsFailure,
  addPlant, addPlantSuccess, addPlantFailure,
  updatePlant, updatePlantSuccess, updatePlantFailure,
  deletePlant, deletePlantSuccess, deletePlantFailure, loadPlant, loadPlantFailure, loadPlantSuccess
} from './plant.actions';
import { Plant } from '../plant.interface';

export interface PlantState {
  plants: Plant[];
  loading: boolean;
  error: string | null;
}

export const initialState: PlantState = {
  plants: [],
  loading: false,
  error: null
};

export const plantReducer = createReducer(
  initialState,

  // Handle the loadPlants action
  on(loadPlants, state => ({ ...state, loading: true })),
  on(loadPlantsSuccess, (state, { plants }) => ({ ...state, loading: false, plants })),
  on(loadPlantsFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Handle the Single loadPlant action
  on(loadPlant, state => ({ ...state, loading: true })),
  on(loadPlantSuccess, (state, { plant }) => ({ ...state, loading: false, plant })),
  on(loadPlantFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Handle the addPlant action
  on(addPlant, state => ({ ...state, loading: true })),
  on(addPlantSuccess, (state, { plant }) => ({ ...state, loading: false, plants: [...state.plants, plant] })),
  on(addPlantFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Handle the updatePlant action
  on(updatePlant, state => ({ ...state, loading: true })),
  on(updatePlantSuccess, (state, { plant }) => ({
    ...state,
    loading: false,
    plants: state.plants.map(p => p.id === plant.id ? plant : p)
  })),
  on(updatePlantFailure, (state, { error }) => ({ ...state, loading: false, error })),

  // Handle the deletePlant action
  on(deletePlant, state => ({ ...state, loading: true })),
  on(deletePlantSuccess, (state, { id }) => ({
    ...state,
    loading: false,
    plants: state.plants.filter(p => p._id !== id)
  })),
  on(deletePlantFailure, (state, { error }) => ({ ...state, loading: false, error }))
);

export function reducer(state: PlantState | undefined, action: Action) {
  return plantReducer(state, action);
}
