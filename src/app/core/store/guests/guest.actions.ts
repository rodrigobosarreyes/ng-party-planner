import { createAction, props } from '@ngrx/store';
import { Guest } from './guest.model';

export const loadGuests = createAction(
  '[Guests] Load Guests',
  props<{ guests: Array<Guest> }>()
);
