import { Routes } from '@angular/router';

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
  },
  {
    path: 'music',
    loadComponent: () =>
      import('./features/music/components/music/music.component').then(
        (m) => m.MusicComponent
      ),
  },
];
