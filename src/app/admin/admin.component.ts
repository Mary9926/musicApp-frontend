import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {SongService} from '../services/song.service';
import {SongModel} from '../model/song.model';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  info: any;
  board: string;
  errorMessage: string;
  addSongList: SongModel[];
  songs: SongModel[];
  isLoggedIn = false;
  constructor(private userService: UserService, private songService: SongService, private token: TokenStorageService) { }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.info.token && this.info.authorities.includes('ROLE_ADMIN')){
      this.isLoggedIn = true;
      this.getSongs();
      this.userService.getAdminPage().subscribe(
        data => {
          this.board = data;
        },
        error => {
          this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
        }
      );
    }
  }
  getSongs(){
    this.songService.getSongs().subscribe(
      data => {
        this.songs = data;
      },
      error => {
        console.log(`${error.status}: ${JSON.parse(error.error).message}`);
      }
    );
  }
  add(title: string, author: string, coverUrl: string, audioUrl: string): void {
    this.songService.addSong({ title, author, coverUrl, audioUrl } as SongModel)
      .subscribe(song => { this.addSongList.push(song); }
      );
  }
  delete(song: SongModel){
    if (confirm('Are you sure to delete ' + song.title)) {
      this.songs = this.songs.filter(s => s !== song);
      this.songService.deleteSong(song).subscribe();
    }
  }

}
