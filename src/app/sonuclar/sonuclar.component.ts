import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {keyVal} from "../keyVal";
import {last, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-sonuclar',
  templateUrl: './sonuclar.component.html',
  styleUrls: ['./sonuclar.component.sass']
})
export class SonuclarComponent implements OnInit {


  constructor(
    private afDb: AngularFireDatabase
  ) { }

  sonuclar: Observable<any[]>;
  adaylar: Observable<any[]>;
  bolgeler: Observable<any[]>;
  partiler: Observable<any[]>;

  fg: FormGroup = new FormGroup({
    'bolge': new FormControl(''),
    'parti': new FormControl(''),
    'aday': new FormControl(''),
    'oy_sayisi': new FormControl(0, [ Validators.min(0) ])
  });

  oySayilari: FormGroup = new FormGroup({});

  ngOnInit() {
    this.sonuclar = this.afDb.list('/sonuclar').snapshotChanges()
      .pipe(
        keyVal(),
        tap(sonuclar => {
          sonuclar.forEach(sonuc => {
            const fc = this.oySayilari.get(sonuc.$key);
            if (!fc) {
              this.oySayilari.addControl(sonuc.$key, new FormControl(sonuc.oy_sayisi));
            }
          });
          Object.keys(this.oySayilari.value).filter(k => !sonuclar.find(s => s.$key === k)).forEach((k) => this.oySayilari.removeControl(k));
        })
      );
    this.adaylar = this.afDb.list('/adaylar').snapshotChanges().pipe(keyVal());
    this.bolgeler = this.afDb.list('/bolgeler').snapshotChanges().pipe(keyVal());
    this.partiler = this.afDb.list('/partiler').snapshotChanges().pipe(keyVal());
  }

  remove(sonuc) {
    this.afDb.object(`/sonuclar/${sonuc.$key}`).remove().catch((err) => alert(err.message));
  }

  updateVotes() {
    const oySayilari = this.oySayilari.value;
    Promise.all(Object.keys(oySayilari).map(k => this.afDb.object('/sonuclar/' + k).update({ oy_sayisi: oySayilari[k] })))
      .then(() => alert('Güncellendi'))
      .catch(err => alert(err.message));
  }

  add(e) {
    e.preventDefault();

    const value = this.fg.value;

    this.afDb.list(`/sonuclar`).push(value)
      .then(() => this.fg.reset())
      .catch(err => alert(err.message));
  }

}
