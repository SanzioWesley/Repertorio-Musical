import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Music } from '../models/music';

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  url = 'http://localhost:3000/musics'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos as musicas
  getMusics(): Observable<Music[]> {
    return this.httpClient.get<Music[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem uma musica pelo id
  getMusicById(id: number): Observable<Music> {
    return this.httpClient.get<Music>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva uma musica
  saveMusic(music: Music): Observable<Music> {
    return this.httpClient.post<Music>(this.url, JSON.stringify(music), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza uma musica
  updateMusic(music: Music): Observable<Music> {
    return this.httpClient.put<Music>(this.url + '/' + music.id, JSON.stringify(music), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta uma musica
  deleteMusic(music: Music) {
    return this.httpClient.delete<Music>(this.url + '/' + music.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de musica
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}
