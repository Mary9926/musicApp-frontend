import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';
import {SongService} from '../services/song.service';
import {SongModel} from '../model/song.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  songs: SongModel[];
  isLoggedIn = false;

  msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;
  constructor(private token: TokenStorageService, private songService: SongService) { }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    if (this.info.token){
      this.isLoggedIn = true;
      this.getSongs();
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
  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
