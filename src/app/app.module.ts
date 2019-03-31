import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import { PartilerComponent } from './partiler/partiler.component';
import { SecimEkraniComponent } from './secim-ekrani/secim-ekrani.component';
import { LineYaziComponent } from './line-yazi/line-yazi.component';
import {ReactiveFormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import { LogoutComponent } from './logout/logout.component';
import {AngularFireStorageModule} from "@angular/fire/storage";
import { ImagePipe } from './image.pipe';
import { AdaylarComponent } from './adaylar/adaylar.component';
import { ElectionZoneComponent } from './election-zone/election-zone.component';
import { DocumentPipe } from './document.pipe';
import { SecurePipe } from './secure.pipe';
import { SonuclarComponent } from './sonuclar/sonuclar.component';

@NgModule({
  declarations: [
    AppComponent,
    PartilerComponent,
    SecimEkraniComponent,
    LineYaziComponent,
    LoginComponent,
    LogoutComponent,
    ImagePipe,
    AdaylarComponent,
    ElectionZoneComponent,
    DocumentPipe,
    SecurePipe,
    SonuclarComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    AngularFireStorageModule,
    AppRoutingModule
  ],
  providers: [
    ImagePipe,
    DocumentPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
