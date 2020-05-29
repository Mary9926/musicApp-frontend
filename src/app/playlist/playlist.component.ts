import { Component, OnInit } from '@angular/core';
import {PlaylistModel} from '../model/playlist.model';
import {SongModel} from '../model/song.model';
import {UserService} from '../services/user.service';
import {Track} from 'ngx-audio-player';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  info: any;
  isLoggedIn = false;
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
      this.setTracks();
    }

  }
  getPlaylist(){
    return new PlaylistModel('Party', 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' , [
      new SongModel('Shallow', 'Lady Gaga', 'https://przeambitni.pl/wp-content/uploads/2017/05/margaret-1.jpg', 'assets/songs/Shallow.mp3'),
      new SongModel('In The End', 'Linkin Park', 'https://przeambitni.pl/wp-content/uploads/2017/05/margaret-1.jpg', 'assets/songs/End.mp3')
    ]);
  }
  setTracks(){
    const songs = this.getPlaylist().songs;
    this.imageUrl = this.getPlaylist().image;
    console.log(this.playlistId);
    for(let i = 0; i < songs.length; i++) {
      this.msaapPlaylist.push({
        title: songs[i].author + ' - ' + songs[i].title,
        link: songs[i].audioUrl
      });
    }
  }
}
