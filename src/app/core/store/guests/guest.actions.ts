import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Guest } from './guest.model';

export const GuestActions = createActionGroup({
  source: 'Guests',
  events: {
    'Page Opened': emptyProps(),
    'Guest Added': props<Guest>(),
    'Guest Removed': props<Pick<Guest, 'id'>>(),
    'Attendence Confirmed': props<Pick<Guest, 'id'>>(),
    'Attendence Declined': props<Pick<Guest, 'id'>>(),
  },
});

export const GuestAPIActions = createActionGroup({
  source: 'Guests API',
  events: {
    'Guests Loaded Failure': props<{ msg: string }>(),
    'Guests Loaded Success': props<{ guests: Array<Guest> }>(),
  },
});
