import { PlantState } from './plant.reducer';
import * as fromPlantSelectors from './plant.selectors';

describe('PlantSelectors', () => {
    const initialState: PlantState = {
        plants: [
            { id: 1, name: 'Rose', family: 'Rosaceae', year: 2000, slug: 'rose', image: 'rose.jpg' },
            { id: 2, name: 'Tulip', family: 'Liliaceae', year: 2005, slug: 'tulip', image: 'tulip.jpg' },
        ],
        loading: false,
        error: null,
    };

    describe('selectPlantState', () => {
        it('should return the plant state', () => {
            const result = fromPlantSelectors.selectPlantState.projector(initialState);
            expect(result).toEqual(initialState);
        });
    });

    describe('selectPlants', () => {
        it('should return the plants array', () => {
            const result = fromPlantSelectors.selectPlants.projector(initialState);
            expect(result).toEqual(initialState.plants);
        });
    });

    describe('selectPlant', () => {
      it('should return a single plant based on its ID', () => {
          const result = fromPlantSelectors.selectPlantById.projector(initialState, { id: 1 });
          expect(result).toEqual(initialState.plants[0]);
      });
  });

    describe('selectLoading', () => {
        it('should return the loading status', () => {
            const result = fromPlantSelectors.selectLoading.projector(initialState);
            expect(result).toBe(false);
        });
    });

    describe('selectError', () => {
        it('should return the error message', () => {
            const result = fromPlantSelectors.selectError.projector(initialState);
            expect(result).toBeNull();
        });
    });
});
