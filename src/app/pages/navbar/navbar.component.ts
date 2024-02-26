import { Component, HostListener } from '@angular/core';
import { UserApiService } from 'src/app/services/user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(private userApiService: UserApiService, private router: Router) {}

  ngOnInit(): void {
    console.log(window.pageYOffset)
    console.log(document.documentElement.scrollTop)
    console.log(document.body.scrollTop)
  }
  title = 'Netflix';

  isNavbarTransparent = true;
  NavColor:any;
  
  @HostListener('window:scroll', [])
  onWindowScroll() {
    const offset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.NavColor = offset > 0 ? 'rgb(20,20,20)' : 'transparent';
  }
  
  logout() {
    this.userApiService.logout().subscribe({
      next: () => {
        // Assurez-vous de supprimer toutes les clés liées à la session de l'utilisateur
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('currentUser'); // Supprimez si vous stockez d'autres détails de l'utilisateur
  
        // Rediriger vers la page de login
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    });
  }


}
