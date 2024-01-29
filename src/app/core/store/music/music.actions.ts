import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Song, SongForm } from './music.model';

export const MusicActions = createActionGroup({
  source: 'Music',
  events: {
    'Page Opened': emptyProps(),
    'Patch Value': props<{ payload: Partial<Song> }>(),
    'Change Validation Status': props<Pick<SongForm, 'isValid'>>(),
  },
});
