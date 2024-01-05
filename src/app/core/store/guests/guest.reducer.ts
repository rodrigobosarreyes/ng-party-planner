import { createReducer, on } from '@ngrx/store';
import { GuestActions } from './guest.actions';
import { Guest } from './guest.model';

const initialState: Array<Guest> = [];

export const guestsReducer = createReducer(
  initialState,
  on(
    GuestActions.guestsLoaded,
    (_state, { guests }): Array<Guest> => [...guests]
  )
);
