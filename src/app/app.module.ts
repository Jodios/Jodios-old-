import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConwaysGameOfLifeComponent } from './conways-game-of-life/conways-game-of-life.component';

import { MatSliderModule } from "@angular/material/slider"
import { MatMenuModule } from "@angular/material/menu"
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { ContactComponent } from './contact/contact.component';
import { QuickSortComponent } from './sorting/quick-sort/quick-sort.component';
import { BubbleSortComponent } from './sorting/bubble-sort/bubble-sort.component';
import { SelectionSortComponent } from './sorting/selection-sort/selection-sort.component'
import { TimingService } from './services/timing-service.service';
import { AngularFireFunctionsModule } from '@angular/fire/functions'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { EmailService } from './services/email.service';
import { HttpClientModule } from '@angular/common/http'
import { fb } from 'config';


const routes = [
  {path:"", component:HomeComponent},
  {path:"conways-game-of-life", component:ConwaysGameOfLifeComponent},
  {path:"contact", component:ContactComponent},
  {path:"sorting/quick-sort", component: QuickSortComponent},
  {path:"sorting/bubble-sort", component: BubbleSortComponent},
  {path:"sorting/selection-sort", component: SelectionSortComponent},
]

@NgModule({
  declarations: [
    AppComponent,
    ConwaysGameOfLifeComponent,
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    QuickSortComponent,
    BubbleSortComponent,
    SelectionSortComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    MatSliderModule,
    MatMenuModule,
    MatIconModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(fb.firebase),
    AngularFireFunctionsModule,
    AngularFireModule,
    AngularFireDatabaseModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    TimingService,
    EmailService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
