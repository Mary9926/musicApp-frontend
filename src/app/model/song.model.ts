export class SongModel {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  audioUrl: string;

  constructor(title: string, author: string, coverUrl: string, audioUrl: string) {
    this.title = title;
    this.author = author;
    this.coverUrl = coverUrl;
    this.audioUrl = audioUrl;
  }

}
