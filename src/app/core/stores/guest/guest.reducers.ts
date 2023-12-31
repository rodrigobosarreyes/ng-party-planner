import { createReducer, on } from '@ngrx/store';
import { Guest } from './guest.model';
import { GuestsActions } from './guest.actions';

export const initialState: ReadonlyArray<Guest> = [];

export const guestsReducer = createReducer(
  initialState,
  on(
    GuestsActions.loadGuests,
    (_state, { guests }): ReadonlyArray<Guest> => [...guests]
  ),
  on(
    GuestsActions.addGuest,
    (state, { guest }): ReadonlyArray<Guest> => [...state, guest]
  ),
  on(GuestsActions.removeGuest, (state, { id }) => {
    return state.filter((v) => v.id !== id);
  }),
  on(
    GuestsActions.confirmGuestAttendance,
    (state, { id, isAttendeeConfirmed }) =>
      state.map((g) => (g.id === id ? { ...g, isAttendeeConfirmed } : g))
  )
);
