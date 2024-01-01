import { Guest } from './guests/guest.model';

export interface AppState {
  guests?: Array<Guest>;
}
