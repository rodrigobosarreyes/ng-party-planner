export interface Song {
  id: string;
  name: string;
  author: string;
}

export class SongForm {
  value: Song = {
    id: crypto.randomUUID(),
    name: '',
    author: '',
  };
  isValid = false;
}
