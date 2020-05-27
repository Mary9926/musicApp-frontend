import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SongModel} from '../model/song.model';
import { catchError, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class SongService {

  private songUrl = 'http://localhost:8080/songs';
  constructor(private http: HttpClient) { }

  getSongs(): Observable<SongModel[]> {
    return this.http.get<SongModel[]>(this.songUrl);
  }
  addSong(song: SongModel): Observable<SongModel> {
    return this.http.post<SongModel>(this.songUrl, song, httpOptions).pipe(
      tap((songAdded: SongModel) => this.log(`added song =${songAdded.id}`)),
      catchError(this.handleError<SongModel>('addSong'))
    );
  }


/**
 * Handle Http operation that failed.
 */

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
