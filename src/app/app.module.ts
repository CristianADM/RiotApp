import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CampeonComponent } from './pages/campeon/campeon.component';
import { RankingComponent } from './pages/ranking/ranking.component';
import { InvocadorComponent } from './pages/invocador/invocador.component';
import { LoadingComponent } from './components/loading/loading.component';

import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NavbarComponent,
    CampeonComponent,
    RankingComponent,
    InvocadorComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
