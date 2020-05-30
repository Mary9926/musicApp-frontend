import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {PlaylistModel} from '../model/playlist.model';
import {TokenStorageService} from '../auth/token-storage.service';
import {SongModel} from '../model/song.model';

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
      this.getPlaylists();
    }
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
  add(name: string, image: string): void {
    this.userService.addPlaylist({ name, image } as PlaylistModel, this.info.username)
      .subscribe(playlist => { this.getPlaylists(); }
      );
  }
  delete(playlist: PlaylistModel){
    if (confirm('Are you sure to delete ' + playlist.name)) {
      this.playlists = this.playlists.filter(p => p !== playlist);
      this.userService.deletePlaylist(playlist, this.info.username).subscribe();
    }
  }

}
