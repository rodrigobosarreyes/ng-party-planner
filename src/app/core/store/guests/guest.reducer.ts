import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { GuestAPIActions, GuestActions } from './guest.actions';
import { Guest } from './guest.model';

const initialState: Array<Guest> = [];

const guestsReducer = createReducer(
  initialState,
  on(
    GuestAPIActions.guestsLoadedSuccess,
    (_state, { guests }): Array<Guest> => [...guests]
  ),
  on(
    GuestActions.guestAdded,
    (state, guest): Array<Guest> => [...state, guest]
  ),
  on(
    GuestActions.guestRemoved,
    (state, { id }): Array<Guest> => state.filter((g) => g.id !== id)
  ),
  on(
    GuestActions.attendenceConfirmed,
    (state, { id }): Array<Guest> =>
      state.map((g) => (g.id === id ? { ...g, isAttendeeConfirmed: true } : g))
  ),
  on(
    GuestActions.attendenceDeclined,
    (state, { id }): Array<Guest> =>
      state.map((g) => (g.id === id ? { ...g, isAttendeeConfirmed: false } : g))
  )
);

export const guestsFeature = createFeature({
  name: 'guests',
  reducer: guestsReducer,
  extraSelectors: ({ selectGuestsState }) => ({
    selectConfirmedGuests: createSelector(selectGuestsState, (guest) =>
      guest.filter((g) => g.isAttendeeConfirmed === true)
    ),
    selectRejectedGuests: createSelector(selectGuestsState, (guest) =>
      guest.filter((g) => g.isAttendeeConfirmed === false)
    ),
    selectUnknownGuests: createSelector(selectGuestsState, (guest) =>
      guest.filter((g) => g.isAttendeeConfirmed === null)
    ),
  }),
});

export const {
  name,
  reducer,
  selectGuestsState,
  selectConfirmedGuests,
  selectRejectedGuests,
  selectUnknownGuests,
} = guestsFeature;
