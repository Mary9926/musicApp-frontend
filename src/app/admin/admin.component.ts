import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {SongService} from '../services/song.service';
import {SongModel} from '../model/song.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board: string;
  errorMessage: string;
  songsList: SongModel[];
  constructor(private userService: UserService, private songService: SongService) { }

  ngOnInit(): void {
    this.userService.getAdminPage().subscribe(
      data => {
        this.board = data;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
  add(title: string, author: string, coverUrl: string, audioUrl: string): void {
  /*  title = title.trim();
    author = author.trim();
    coverUrl = coverUrl.trim();
    audioUrl = audioUrl.trim();*/
    this.songService.addSong({ title, author, coverUrl, audioUrl } as SongModel)
      .subscribe(song => { this.songsList.push(song); }
      );
    window.location.reload();
  }


}
