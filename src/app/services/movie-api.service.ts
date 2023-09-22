import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovieApiService {

  constructor( private http: HttpClient) {
  }
  baseURL = "https://api.themoviedb.org/3";
  apiKey = "6481a891cc0c2904c45c4f15f63ea6af"

  bannerApiData():Observable<any>{
    return this.http.get(`${this.baseURL}/trending/all/day?api_key=${this.apiKey}`)
  }

  trendingMovieApiData(): Observable<any> {
    return this.http.get(`${this.baseURL}/trending/movie/day?api_key=${this.apiKey}`);
  }
  getMovieDetails (id:any): Observable<any>{
    return this.http.get(`${this.baseURL}/movie/${id}?api_key=${this.apiKey}`)
  }

  // getMovieVideo
  getMovieVideo(data: any): Observable<any> {
    return this.http.get(`${this.baseURL}/movie/${data}/videos?api_key=${this.apiKey}`)
  }

  // getMovieCast
  getMovieCast(data: any): Observable<any> {
    return this.http.get(`${this.baseURL}/movie/${data}/credits?api_key=${this.apiKey}`)
  }
  // action
  fetchActionMovies(): Observable<any> {
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=28`);
  }

  // adventure
  fetchAdventureMovies(): Observable<any> {
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=12`);
  }

  // animation
  fetchAnimationMovies(): Observable<any> {
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=16`);
  }

  // comedy
  fetchComedyMovies(): Observable<any> {
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=35`);
  }

  // documentary
  fetchDocumentaryMovies(): Observable<any> {
    return this.http.get(`${this.baseURL}/discover/movie?api_key=${this.apiKey}&with_genres=99`);
  }
}






