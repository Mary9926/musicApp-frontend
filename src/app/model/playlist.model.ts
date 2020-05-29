import {SongModel} from './song.model';

export class PlaylistModel {
  id: number;
  name: string;
  songs: SongModel[];
  image: string;

  constructor(name: string, image: string, songs: SongModel[]) {
    this.name = name;
    this.image = image;
    this.songs = songs;
  }

}

