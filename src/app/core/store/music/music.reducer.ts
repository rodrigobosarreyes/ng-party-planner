import { createFeature, createReducer, on } from '@ngrx/store';
import { Song, SongForm } from './music.model';
import { MusicActions } from './music.actions';

export interface MusicState {
  value: Song;
  isValid: boolean;
}

const initialState = new SongForm();

const musicReducer = createReducer(
  initialState,
  on(
    MusicActions.patchValue,
    (state, { payload }): MusicState => ({
      ...state,
      value: { ...state.value, ...payload },
    })
  ),
  on(
    MusicActions.changeValidationStatus,
    (state, { isValid }): MusicState => ({ ...state, isValid })
  )
);

export const musicFeature = createFeature({
  name: 'music',
  reducer: musicReducer,
});
