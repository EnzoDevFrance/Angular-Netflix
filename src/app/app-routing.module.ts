import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import { MovieDetailComponent } from "./pages/movie-detail/movie-detail.component";
import { AccountComponent } from './pages/account/account.component';
import { ChooseSessionComponent } from './pages/choose-session/choose-session.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'',component:HomeComponent, canActivate:[authGuard]},
  {path:'movie-detail/:id', component:MovieDetailComponent, canActivate:[authGuard]},
  {path:'account',component:AccountComponent, canActivate:[authGuard]},
  {path:'choose-session',component:ChooseSessionComponent, canActivate:[authGuard]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
