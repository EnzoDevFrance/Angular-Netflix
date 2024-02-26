import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { UserDto } from '../dto/UserDto';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiURL = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Inscription d'un utilisateur
  register(registerPayload: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiURL}/register`, registerPayload, { observe: 'response' });
  }

  // Authentification d'un utilisateur
  authenticate(loginPayload: any): Observable<HttpResponse<any>> {
    return this.http.post<any>(`${this.apiURL}/authenticate`, loginPayload, { observe: 'response' });
  }

  // Rafraîchissement du token JWT à l'aide d'un payload
  refreshToken(refreshTokenPayload: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/refresh-token`, refreshTokenPayload);
  }

  // Rafraîchissement du token JWT lorsque le token de rafraîchissement est dans un cookie
  refreshTokenWithCookie(): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/refresh-token-cookie`, {}, { withCredentials: true });
  }

  // Obtention des informations d'authentification (ajustée pour supprimer l'usage de `body` dans une requête GET)
  getAuthenticationInfo(): Observable<any> {
    // La méthode doit être ajustée si vous avez besoin de passer des informations spécifiques.
    // Utilisez des paramètres de requête, des headers, ou changez la méthode en POST si nécessaire.
    return this.http.get<any>(`${this.apiURL}/info`);
  }

  // Déconnexion d'un utilisateur
  logout(): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/logout`, {}, { withCredentials: true });
  }

  getLoggedInUserInfo(): Observable<UserDto> {
    return this.http.get<UserDto>(`${this.apiURL}/me`);
  }

  updateUserInfo(userInfo: UserDto): Observable<UserDto> {
    return this.http.put<UserDto>(`${this.apiURL}/update`, userInfo);
  }
  
  changePassword(passwordChangeRequest: { currentPassword: string; newPassword: string }): Observable<any> {
    return this.http.post<any>(`${this.apiURL}/change-password`, passwordChangeRequest);
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