import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampeonComponent } from './pages/campeon/campeon.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { InvocadorComponent } from './pages/invocador/invocador.component';
import { RankingComponent } from './pages/ranking/ranking.component';

const rutas: Routes= [
  {path: "inicio", component: InicioComponent},
  {path: "campeon/:idCampeon", component: CampeonComponent},
  {path: "ranking", component: RankingComponent},
  {path: "invocador/:idInvocador", component: InvocadorComponent},
  {path: "**", pathMatch: "full", redirectTo: "inicio"}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(rutas)
  ], exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
