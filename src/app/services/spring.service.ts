import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpringService {

  constructor(private http: HttpClient) { }

  readonly URL_base = "http://localhost:8080/netflix"; // a quoi sert readonly ?????
  readonly rest = "/api";


  getUser(){
    return this.http.get(`${this.URL_base}${this.rest}`);
  }


}
