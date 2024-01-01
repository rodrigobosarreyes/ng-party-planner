import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { guestsReducer } from './core/store/guests/guest.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore({ guests: guestsReducer })],
};
