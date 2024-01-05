import { createActionGroup, props } from '@ngrx/store';
import { Guest } from './guest.model';

export const GuestActions = createActionGroup({
  source: 'Guests',
  events: {
    'Guests Loaded': props<{ guests: Array<Guest> }>(),
    'Guest Added': props<Guest>(),
    'Guest Removed': props<Pick<Guest, 'id'>>(),
    'Attendence Confirmed': props<Pick<Guest, 'id'>>(),
    'Attendence Declined': props<Pick<Guest, 'id'>>(),
  },
});
