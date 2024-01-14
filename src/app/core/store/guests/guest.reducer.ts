import { createReducer, on } from '@ngrx/store';
import { GuestAPIActions, GuestActions } from './guest.actions';
import { Guest } from './guest.model';

const initialState: Array<Guest> = [];

export const guestsReducer = createReducer(
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
