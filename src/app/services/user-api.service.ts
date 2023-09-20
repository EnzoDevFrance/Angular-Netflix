import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} ) //pour dire que les données recu sont en JSON
}

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  apiURL: string = 'http://localhost:8080/netflix';

  constructor( private http: HttpClient) {
  }


  getUser(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}/rest/1`);
    }
    





}
//ANGULAR.JSON

// "serve": {
//   "builder": "@angular-devkit/build-angular:dev-server",
//   "configurations": {
//     "production": {
//       "browserTarget": "NETFLIX_Angular:build:production"
//     },
//     "development": {
//       "browserTarget": "NETFLIX_Angular:build:development"
//     }
//   },
//   "defaultConfiguration": "development"
// },