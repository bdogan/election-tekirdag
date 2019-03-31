import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PartilerComponent} from "./partiler/partiler.component";
import {SecimEkraniComponent} from "./secim-ekrani/secim-ekrani.component";
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from "./logout/logout.component";
import {ElectionZoneComponent} from "./election-zone/election-zone.component";
import {AdaylarComponent} from "./adaylar/adaylar.component";
import {SonuclarComponent} from './sonuclar/sonuclar.component';

const routes: Routes = [
  { path: 'partiler', pathMatch: 'full', component: PartilerComponent },
  { path: 'zones', pathMatch: 'full', component: ElectionZoneComponent },
  { path: 'adaylar', pathMatch: 'full', component: AdaylarComponent },
  { path: 'sonuclar', pathMatch: 'full', component: SonuclarComponent },
  { path: '', pathMatch: 'full', component: SecimEkraniComponent },
  { path: 'login', pathMatch: 'full', component: LoginComponent },
  { path: 'logout', pathMatch: 'full', component: LogoutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
