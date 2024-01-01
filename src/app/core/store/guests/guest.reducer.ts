import { createReducer, on } from '@ngrx/store';
import * as guestsActions from './guest.actions';
import { Guest } from './guest.model';

const initialState: Array<Guest> = [];

export const guestsReducer = createReducer(
  initialState,
  on(
    guestsActions.loadGuests,
    (_state, { guests }): Array<Guest> => [...guests]
  )
);
