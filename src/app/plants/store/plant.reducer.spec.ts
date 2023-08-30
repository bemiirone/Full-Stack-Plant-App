import { reducer, initialState, PlantState } from './plant.reducer';
import {
  loadPlants,
  loadPlantsSuccess,
  loadPlantsFailure,
  addPlant,
  addPlantSuccess,
  addPlantFailure,
  updatePlant,
  updatePlantSuccess,
  updatePlantFailure,
  deletePlant,
  deletePlantSuccess,
  deletePlantFailure,
} from './plant.actions';
import { Plant } from '../plant.interface';

describe('PlantReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = { type: 'NOOP' } as any;
      const result = reducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('loadPlants action', () => {
    it('should set loading to true', () => {
      const action = loadPlants({ limit: 10, offset: 0 });
      const result = reducer(initialState, action);

      expect(result.loading).toBe(true);
    });
  });

  describe('loadPlantsSuccess action', () => {
    it('should map an array of plants', () => {
      const plants = [
        {
          id: 1,
          name: 'A',
          family: 'B',
          year: 2000,
          slug: 'a',
          image: 'test.jpg',
        },
      ];
      const action = loadPlantsSuccess({ plants });
      const result = reducer({ ...initialState, loading: true }, action);

      expect(result.plants).toEqual(plants);
      expect(result.loading).toBe(false);
    });
  });

  describe('loadPlantsFailure action', () => {
    it('should set loading to false and set an error message', () => {
      const error = 'Error loading plants';
      const action = loadPlantsFailure({ error });
      const result = reducer({ ...initialState, loading: true }, action);

      expect(result.loading).toBe(false);
      expect(result.error).toEqual(error);
    });
  });

  describe('addPlantSuccess action', () => {
    it('should add a plant', () => {
      const plant: Plant = {
        id: 1,
        name: 'A',
        family: 'B',
        year: 2000,
        slug: 'a',
        image: 'test.jpg',
      };
      const action = addPlantSuccess({ plant });
      const result = reducer({ ...initialState, loading: true }, action);

      expect(result.plants).toEqual([plant]);
      expect(result.loading).toBe(false);
    });
  });

  describe('addPlantFailure action', () => {
    it('should set loading to false and set an error message', () => {
      const error = 'Error adding plant';
      const action = addPlantFailure({ error });
      const result = reducer({ ...initialState, loading: true }, action);

      expect(result.loading).toBe(false);
      expect(result.error).toEqual(error);
    });
  });

  describe('updatePlantSuccess action', () => {
    it('should update a plant', () => {
      const plant: Plant = {
        id: 1,
        name: 'A',
        family: 'B',
        year: 2000,
        slug: 'a',
        image: 'test.jpg',
      };
      const updatedPlant: Plant = { ...plant, name: 'Updated' };
      const action = updatePlantSuccess({ plant: updatedPlant });
      const result = reducer(
        { ...initialState, plants: [plant], loading: true },
        action
      );

      expect(result.plants).toEqual([updatedPlant]);
      expect(result.loading).toBe(false);
    });
  });

  describe('updatePlantFailure action', () => {
    it('should set loading to false and set an error message', () => {
      const error = 'Error updating plant';
      const action = updatePlantFailure({ error });
      const result = reducer({ ...initialState, loading: true }, action);

      expect(result.loading).toBe(false);
      expect(result.error).toEqual(error);
    });
  });

  describe('deletePlantSuccess action', () => {
    it('should delete a plant', () => {
      const plant: Plant = {
        id: 1,
        name: 'A',
        family: 'B',
        year: 2000,
        slug: 'a',
        image: 'test.jpg',
      };
      const action = deletePlantSuccess({ id: 1 });
      const result = reducer(
        { ...initialState, plants: [plant], loading: true },
        action
      );

      expect(result.plants).toEqual([]);
      expect(result.loading).toBe(false);
    });
  });

  describe('deletePlantFailure action', () => {
    it('should set loading to false and set an error message', () => {
      const error = 'Error deleting plant';
      const action = deletePlantFailure({ error });
      const result = reducer({ ...initialState, loading: true }, action);

      expect(result.loading).toBe(false);
      expect(result.error).toEqual(error);
    });
  });
});
