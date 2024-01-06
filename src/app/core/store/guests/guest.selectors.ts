import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const selectAllGuests = (state: AppState) => state.guests;

export const selectGuests = createSelector(selectAllGuests, (g) => g);

export const selectConfirmedGuests = createSelector(
  selectAllGuests,
  (guest) => guest?.filter((g) => g.isAttendeeConfirmed === true)
);

export const selectRejectedGuests = createSelector(
  selectAllGuests,
  (guest) => guest?.filter((g) => g.isAttendeeConfirmed === false)
);

export const selectUnknownGuests = createSelector(
  selectAllGuests,
  (guest) => guest?.filter((g) => g.isAttendeeConfirmed === null)
);
