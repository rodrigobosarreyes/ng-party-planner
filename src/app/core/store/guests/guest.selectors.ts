import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectAllGuests = (state: AppState) => state.guests;

export const selectGuests = createSelector(selectAllGuests, (g) => g);
