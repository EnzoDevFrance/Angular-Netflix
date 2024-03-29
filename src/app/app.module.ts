import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { MovieDetailComponent } from './pages/movie-detail/movie-detail.component';
import { HttpClientModule } from "@angular/common/http";
import { MovieApiService } from "./services/movie-api.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarousselComponent } from './pages/caroussel/caroussel.component';
import { AccountComponent } from './pages/account/account.component';
import { ChooseSessionComponent } from './pages/choose-session/choose-session.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { SwiperModule } from 'swiper/angular';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieDetailComponent,
    CarousselComponent,
    AccountComponent,
    ChooseSessionComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SwiperModule,

    
  ],
  providers: [MovieApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
