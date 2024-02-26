import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:8080/api'; // Définir l'URL de base ici
  private currentUserSubject: BehaviorSubject<any>;
  private currentUser: Observable<any>; 

  constructor(private http: HttpClient) {
    const currentUserStorage = localStorage.getItem('currentUser');
    const currentUser = currentUserStorage ? JSON.parse(currentUserStorage) : null;
    this.currentUserSubject = new BehaviorSubject<any>(currentUser);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

login(email: string, password: string): Observable<any> {
  return this.http.post<any>(`${this.apiURL}/authenticate`, { email, password })
    .pipe(map(authResponse => {
      // Corriger les clés pour correspondre à la réponse de l'API
      if (authResponse.access_token && authResponse.refresh_token) {
        console.log('Stockage de access_token:', authResponse.access_token);
        console.log('Stockage de refresh_token:', authResponse.refresh_token); 
      
        // localStorage.setItem('accessToken', authResponse.access_token);
        // localStorage.setItem('refreshToken', authResponse.refresh_token);

        // Mettre à jour currentUserSubject avec les informations d'authentification
        this.currentUserSubject.next({ email, ...authResponse });
      } else {
        console.log('Les tokens access_token et refresh_token sont absents de la réponse.');
      }
      
      return authResponse;
    }));
}

isAuthenticated(): Observable<any> {
  return this.http.get<any>(`${this.apiURL}/isAuthenticated`, { withCredentials: true });
}


}