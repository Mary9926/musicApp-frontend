import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {SongService} from '../services/song.service';
import {SongModel} from '../model/song.model';
import {PlaylistModel} from '../model/playlist.model';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  message: string;
  songs: SongModel[];
  songsFilter: SongModel[];
  playlists: PlaylistModel[];
  isLoggedIn = false;
  isUser = false;
  msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;
  constructor(private token: TokenStorageService, private songService: SongService, private userService: UserService) { }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.info.token){
      this.isLoggedIn = true;
      this.getSongs();
      this.getPlaylists();
    }
    if (!this.info.authorities.includes('ROLE_ADMIN')){
      this.isUser = true;
    }
  }
  getSongs(){
    this.songService.getSongs().subscribe(
      data => {
        this.songs = data;
        this.songsFilter = data;
      },
      error => {
        console.log(`${error.status}: ${JSON.parse(error.error).message}`);
      }
    );
  }
  getPlaylists(){
    this.userService.getUserPlaylists(this.info.username).subscribe(
      data => {
        this.playlists = data;
      },
      error => {
        console.log(`${error.status}: ${JSON.parse(error.error).message}`);
      }
    );
  }
  search(event) {
    let value = event.target.value.toLowerCase().split(' ').join('');
    this.songsFilter = this.songs.filter((element) => {
      return (element.title.toLowerCase().split(' ').join('').includes(value)
        || element.author.toLowerCase().split(' ').join('').includes(value));
    });
  }
  addSongToPlaylist(songId: number, playlist: PlaylistModel){
    this.userService.addSongToPlaylist(songId, playlist, this.info.username)
      .subscribe(() => { this.message = 'Added to ' + playlist.name; }
      );
  }
}
