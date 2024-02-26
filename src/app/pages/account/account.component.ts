import { Component, OnInit } from '@angular/core';
import { UserApiService } from 'src/app/services/user-api.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  user: any = {};  // Variable pour stocker les données de l'utilisateur
  confirmPassword: string = '';
  originalUser: any;
  isEditMode: boolean = false;
  isEditPasswordMode: boolean = false;
  isChanged: boolean = false;
  passwordError: boolean = false;

  constructor(private userApiService: UserApiService) { }

  ngOnInit(): void {
    this.userApiService.getLoggedInUserInfo().subscribe({
      next: (userInfo) => {
        this.user = userInfo;
        console.log(this.user);
        this.originalUser = { ...userInfo };  // Gardez une copie pour pouvoir annuler les modifications
      },
      error: (error) => {
        console.error('Erreur lors de la récupération des informations de l\'utilisateur', error);
      }
    });
  }


  toggleEditInfoMode(): void {
    this.isEditPasswordMode = false; // Ensure only one mode is active at a time
    this.isEditMode = !this.isEditMode;
  }

  toggleEditPasswordMode(): void {
    this.isEditMode = false; // Ensure only one mode is active at a time
    this.isEditPasswordMode = !this.isEditPasswordMode;
  }
  
  cancelEditInfo(): void {
    this.user = { ...this.originalUser };
    this.isEditMode = false;
  }

  cancelEditPassword(): void {
    this.isEditPasswordMode = false;
  }


  setChanged(): void {
    this.isChanged = true;
  }



  saveUserInfo(): void {
    this.userApiService.updateUserInfo(this.user).subscribe({
      next: (updatedUser) => {
        this.user = updatedUser;
        this.originalUser = { ...updatedUser };
        this.toggleEditInfoMode();
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour des informations de l\'utilisateur', error);
      }
    });
  }
  
  saveNewPassword(): void {
    if (this.user.password !== this.confirmPassword) {
      this.passwordError = true;
      return;
    }
    this.passwordError = false;
  
    this.userApiService.changePassword({ currentPassword: this.user.currentPassword, newPassword: this.user.password }).subscribe({
      next: () => {
        this.toggleEditPasswordMode();
        // Réinitialiser les champs de mot de passe ici si nécessaire
      },
      error: (error) => {
        console.error('Erreur lors du changement de mot de passe', error);
      }
    });
  }
}