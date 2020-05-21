import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../auth/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  info: any;
  songs: any;

  msbapDisplayTitle = true;
  msbapDisplayVolumeControls = true;
  constructor(private token: TokenStorageService) { }

  ngOnInit(): void {
    this.info = {
      token: this.token.getToken(),
      username: this.token.getUsername(),
      authorities: this.token.getAuthorities()
    };
    this.songs = this.getSongs();
  }
  getSongs(){
    return [
      {
        coverUrl: 'https://lastfm.freetls.fastly.net/i/u/770x0/00ac90084a3f8bc9dc37ebb6a96867bb.jpg',
        author: 'Lady Gaga',
        title: 'Shallow',
        audioUrl: 'assets/songs/Shallow.mp3'
      },
      {
        coverUrl: 'https://lastfm.freetls.fastly.net/i/u/770x0/00ac90084a3f8bc9dc37ebb6a96867bb.jpg',
        author: 'Lady Gaga',
        title: 'Shallow',
        audioUrl: 'assets/songs/Shallow.mp3'
      }
    ]
  }
  logout() {
    this.token.signOut();
    window.location.reload();
  }
}
