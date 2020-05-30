import { Component, OnInit } from '@angular/core';
import {PlaylistModel} from '../model/playlist.model';
import {UserService} from '../services/user.service';
import {Track} from 'ngx-audio-player';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';
import {SongModel} from '../model/song.model';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  info: any;
  playlist: PlaylistModel;
  isLoggedIn = false;
  isNotEmpty = true;
  songsLoaded = false;
  board: string;
  playlistId: any;
  imageUrl: string;
  errorMessage: string;
  msaapDisplayTitle = true;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2, 4];
  msaapDisplayVolumeControls = true;
  msaapPlaylist: Track[] = [];
  constructor(private token: TokenStorageService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.userService.getUserPage().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.info.token && !this.info.authorities.includes('ROLE_ADMIN')){
      this.isLoggedIn = true;
      this.playlistId = Number(this.route.snapshot.paramMap.get('id'));
      this.getPlaylist();
    }

  }
  getPlaylist(){
    this.userService.getPlaylistById(this.info.username, this.playlistId).subscribe(
      data => {
        this.playlist = data;
        this.setTracks();
      },
      error => {
        console.log(`${error.status}: ${JSON.parse(error.error).message}`);
      }
    );
  }
  setTracks(){
    const songs = this.playlist.songs;
    if (songs.length <= 0) {
      this.isNotEmpty = false;
    }
    this.imageUrl = this.playlist.image;
    for(let i = 0; i < songs.length; i++) {
      this.msaapPlaylist.push({
        title: songs[i].author + ' - ' + songs[i].title,
        link: songs[i].audioUrl
      });
    }
    this.songsLoaded = true;
  }
  deleteSongFromPlaylist(song: SongModel){
    if (confirm('Are you sure to delete ' + song.title)) {
      this.userService.deleteSongFromPlaylist(song, this.playlist.id, this.info.username ).subscribe( () => {
        window.location.reload();
      });
    }
  }
}
