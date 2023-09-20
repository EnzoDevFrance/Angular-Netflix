import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import { MovieDetailComponent } from "./pages/movie-detail/movie-detail.component";
import { AccountComponent } from './pages/account/account.component';
import { ChooseSessionComponent } from './pages/choose-session/choose-session.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'movie-detail/:id', component:MovieDetailComponent},
  {path:'account',component:AccountComponent},
  {path:'choose-session',component:ChooseSessionComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule { }
