import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/model/user.model';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    lastname: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      // Regex pour valider le mot de passe
      Validators.pattern('^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$')
    ])
  });

  constructor(private userApiService: UserApiService) {}

  registerUser(): void {
    // Vérification que le formulaire est valide avant de faire l'appel API
    if (this.registerForm.valid) {
      // Appel API pour enregistrer l'utilisateur avec les données du formulaire
      this.userApiService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Inscription réussie', response);
          // Ici, vous pouvez gérer la logique post-inscription, comme rediriger l'utilisateur ou afficher un message de succès
        },
        error: (error) => {
          console.error("Erreur lors de l'inscription", error);
          // Ici, vous pouvez gérer les erreurs, comme afficher un message d'erreur à l'utilisateur
        }
      });
    } else {
      // Gérer le cas où le formulaire n'est pas valide.
      console.error('Le formulaire n\'est pas valide');
    }
  }
}
// {
//   "firstname": "John2",
//   "lastname": "Doe",
//   "email": "john.doe@example.com",
//   "password": "Password123456789&",
//   "age":"18"
// }