import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { appState } from './core/stores/app/app.store';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideStore(appState)],
};
