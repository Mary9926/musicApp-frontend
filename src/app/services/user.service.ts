import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PlaylistModel} from '../model/playlist.model';
import {catchError, tap} from 'rxjs/operators';
import {SongModel} from '../model/song.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/restApi/exampleSecurity/user';
  private adminUrl = 'http://localhost:8080/restApi/exampleSecurity/admin';
  private url = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) { }

  getUserPage(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getAdminPage(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  getUserPlaylists(username: string): Observable<PlaylistModel[]> {
    return this.http.get<PlaylistModel[]>(this.url + username + '/playlists');
  }

  getPlaylistById(username: string, id: number): Observable<PlaylistModel> {
    return this.http.get<PlaylistModel>(this.url + username + '/playlists/' + id);
  }

  addPlaylist(playlist: PlaylistModel, username: string): Observable<PlaylistModel> {
    return this.http.post<PlaylistModel>(this.url + username + '/playlists', playlist, httpOptions).pipe(
      tap((playlistAdded: PlaylistModel) => this.log(`added playlist =${playlistAdded}`)),
      catchError(this.handleError<PlaylistModel>('playlist'))
    );
  }

  deletePlaylist(playlist: PlaylistModel | number, username: string): Observable<PlaylistModel> {
    const id = typeof playlist === 'number' ? playlist : playlist.id;
    const url = `${this.url}${username}/playlists/${id}`;
    return this.http.delete<PlaylistModel>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted playlist`)),
      catchError(this.handleError<PlaylistModel>('playlistDeleted'))
    );
  }

  addSongToPlaylist(songId: number, playlist: PlaylistModel, username: string): Observable<PlaylistModel> {
    return this.http.post<PlaylistModel>(this.url + username + '/playlists/' + playlist.id + '/songs/' + songId, httpOptions).pipe(
      tap((playlistAdded: PlaylistModel) => this.log(`added song to playlist =${playlistAdded}`)),
      catchError(this.handleError<PlaylistModel>('song not addded'))
    );
  }

  deleteSongFromPlaylist(song: SongModel | number, playlistId: number, username: string): Observable<SongModel> {
    const songId = typeof song === 'number' ? song : song.id;
    const url = `${this.url}${username}/playlists/${playlistId}/songs/${songId}`;
    return this.http.delete<SongModel>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted song`)),
      catchError(this.handleError<SongModel>('songDeleted'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('SongService: ' + message);
  }

}
