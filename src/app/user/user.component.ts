import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import { Track } from 'ngx-audio-player';
import {PlaylistModel} from '../model/playlist.model';
import {SongModel} from '../model/song.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  board: string;
  errorMessage: string;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserPage().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }

}
