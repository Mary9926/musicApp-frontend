import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {PlaylistModel} from '../model/playlist.model';
import {SongModel} from '../model/song.model';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  info: any;
  isLoggedIn = false;
  board: string;
  errorMessage: string;
  playlists: PlaylistModel[];

  constructor(private token: TokenStorageService, private userService: UserService) {}

  ngOnInit() {
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
      this.playlists = this.getPlaylists();
    }
  }
  getPlaylists(){
    return [
      new PlaylistModel('Party', 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' ,
[new SongModel('Shallow', 'Lady Gaga', 'https://przeambitni.pl/wp-content/uploads/2017/05/margaret-1.jpg', 'assets/songs/Shallow.mp3'),
        new SongModel('In The End', 'Linkin Park', 'https://przeambitni.pl/wp-content/uploads/2017/05/margaret-1.jpg', 'assets/songs/End.mp3')
      ]),
      new PlaylistModel('Party', 'https://images.pexels.com/photos/801863/pexels-photo-801863.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' ,
        [new SongModel('Shallow', 'Lady Gaga', 'https://przeambitni.pl/wp-content/uploads/2017/05/margaret-1.jpg', 'assets/songs/Shallow.mp3'),
          new SongModel('In The End', 'Linkin Park', 'https://przeambitni.pl/wp-content/uploads/2017/05/margaret-1.jpg', 'assets/songs/End.mp3')
        ])
    ];
  }

}
