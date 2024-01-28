import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GuestsService } from '../../../features/guests/services/guests.service';
import { GuestAPIActions, GuestActions } from './guest.actions';
import { catchError, exhaustMap, map, of, tap } from 'rxjs';
import { MessageService } from 'primeng/api';

export const loadGuests = createEffect(
  (actions$ = inject(Actions), guestsService = inject(GuestsService)) => {
    return actions$.pipe(
      ofType(GuestActions.pageOpened),
      exhaustMap(() =>
        guestsService.getGuests().pipe(
          map((guests) => GuestAPIActions.guestsLoadedSuccess({ guests })),
          catchError((error: { message: string }) =>
            of(GuestAPIActions.guestsLoadedFailure({ msg: error.message }))
          )
        )
      )
    );
  },
  { functional: true }
);

export const displayGuestErrorAlert = createEffect(
  (actions$ = inject(Actions), messageService = inject(MessageService)) => {
    return actions$.pipe(
      ofType(GuestAPIActions.guestsLoadedFailure),
      tap(({ msg }) =>
        messageService.add({ severity: 'error', summary: 'Error', detail: msg })
      )
    );
  },
  { functional: true, dispatch: false }
);
