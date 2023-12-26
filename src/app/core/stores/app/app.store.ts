import * as fromGuests from '../guest';

export const appState = {
  guests: fromGuests.guestsReducer,
};
