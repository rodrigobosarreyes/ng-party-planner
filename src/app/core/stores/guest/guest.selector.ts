import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Guest } from './guest.model';

export const selectGuestCollection =
  createFeatureSelector<ReadonlyArray<Guest>>('guests');

export const selectAllGuests = createSelector(
  selectGuestCollection,
  (guests) => guests
);
