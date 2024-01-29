import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { guestsFeature } from './core/store/guests/guest.reducer';
import { provideEffects } from '@ngrx/effects';
import * as guestsEffects from './core/store/guests/guest.effects';
import { musicFeature } from './core/store/music/music.reducer';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/guests',
  },
  {
    path: 'guests',
    loadComponent: () =>
      import('./features/guests/components/guests/guests.component').then(
        (m) => m.GuestsComponent
      ),
    providers: [provideState(guestsFeature), provideEffects(guestsEffects)],
  },
  {
    path: 'music',
    loadComponent: () =>
      import('./features/music/components/music/music.component').then(
        (m) => m.MusicComponent
      ),
    providers: [provideState(musicFeature)],
  },
];
