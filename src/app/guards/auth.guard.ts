import { CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth-service.service';
import { map, Observable, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  // Utilisez pipe pour traiter l'Observable retourné par isAuthenticated
  return authService.isAuthenticated().pipe(
    map(isAuthenticated => {
      console.log('isAuthenticated:', isAuthenticated); // Log pour voir la valeur retournée par isAuthenticated
      // Si isAuthenticated est true, autorisez l'accès
      if (isAuthenticated) {
        console.log('Accès autorisé'); // Log si l'accès est autorisé
        return true;
      } else {
        // Sinon, redirigez vers la page de login
        console.log('Redirection vers /login'); // Log si la redirection vers login est déclenchée
        router.navigate(['/login']);
        return false;
      }
    }),
    catchError((error) => {
      console.error('Erreur dans authGuard:', error); // Log en cas d'erreur
      // En cas d'erreur, redirigez également vers la page de login
      router.navigate(['/login']);
      return of(false);
    })
  );
};








// export const authGuard: CanActivateFn = (route, state) => {

//   const token = localStorage.getItem('accessToken');
//   console.log(route);
//   console.log(state);
//   const router = inject(Router);

  
//   console.log('Im in auth guard');
//   console.log('accessToken', token);
//   if(token) {
//     const decodedToken: any = jwtDecode(token)
//     console.log('Token decodé : ' + decodedToken);
//     console.log( decodedToken);
    
//     return true;
//   } else {
//     router.navigate(['login']);
//     return false;
//   }

// };