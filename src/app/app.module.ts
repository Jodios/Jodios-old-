import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConwaysGameOfLifeComponent } from './conways-game-of-life/conways-game-of-life.component';

import { MatSliderModule } from "@angular/material/slider"
import { MatMenuModule } from "@angular/material/menu"
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

const routes = [
  {path:"", component:HomeComponent},
  {path:"conways-game-of-life", component:ConwaysGameOfLifeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ConwaysGameOfLifeComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatSliderModule,
    MatMenuModule,
    NgbModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
