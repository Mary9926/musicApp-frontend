import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SongModel} from '../model/song.model';

@Injectable({
  providedIn: 'root'
})
export class SongService {

  private songUrl = 'http://localhost:8080/songs';
  constructor(private http: HttpClient) { }

  getSongs(): Observable<SongModel[]> {
    return this.http.get<SongModel[]>(this.songUrl);
  }
 /* getSong(): Observable<SongModel[]> {
    return this.http.get<SongModel[]>(this.title);
  }*/

}
