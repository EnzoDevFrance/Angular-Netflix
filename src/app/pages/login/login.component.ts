import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Rediriger l'utilisateur s'il est déjà connecté
    if (this.authService.currentUserValue) {
      this.router.navigate(['']); // Ajustez selon votre route d'accueil
    }
  }

  onLoggedin() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe({
        next: () => {
          this.router.navigate(['']); // Ajustez selon votre route d'accueil
        },
        error: error => {
          this.errorMessage = error;
          this.loading = false;
        }
      });
  }
}