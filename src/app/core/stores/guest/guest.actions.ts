import { createActionGroup, props } from '@ngrx/store';
import { Guest } from './guest.model';

export const GuestsActions = createActionGroup({
  source: 'Guests',
  events: {
    'Load Guests': props<{ guests: ReadonlyArray<Guest> }>(),
    'Add Guest': props<{ guest: Guest }>(),
    'Remove Guest': props<Pick<Guest, 'id'>>(),
    'Confirm Guest Attendance':
      props<Pick<Guest, 'id' | 'isAttendeeConfirmed'>>(),
  },
});
