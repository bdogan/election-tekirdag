import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {keyVal} from "../keyVal";
import {last, switchMap, tap} from "rxjs/operators";

@Component({
  selector: 'app-election-zone',
  templateUrl: './election-zone.component.html',
  styleUrls: ['./election-zone.component.sass']
})
export class ElectionZoneComponent implements OnInit {

  constructor(
    private afDb: AngularFireDatabase
  ) { }

  bolgeler: Observable<any[]>;

  fg: FormGroup = new FormGroup({
    'name': new FormControl(''),
    'acilan_sandik': new FormControl(0)
  });

  acilanSandik: FormGroup = new FormGroup({});

  ngOnInit() {
    this.bolgeler = this.afDb.list('/bolgeler').snapshotChanges().pipe(
      keyVal(),
      tap(bolgeler => {
        bolgeler.forEach(bolge => {
          const fc = this.acilanSandik.get(bolge.$key);
          if (!fc) {
            this.acilanSandik.addControl(bolge.$key, new FormControl(bolge.acilan_sandik));
          }
        });
        Object.keys(this.acilanSandik.value).filter(k => !bolgeler.find(s => s.$key === k)).forEach((k) => this.acilanSandik.removeControl(k));
      })
    );
  }

  remove(zone) {
    this.afDb.object(`/bolgeler/${zone.$key}`).remove().catch((err) => alert(err.message));
  }

  updateNumbers() {
    const acilanSandik = this.acilanSandik.value;
    Promise.all(Object.keys(acilanSandik).map(k => this.afDb.object('/bolgeler/' + k).update({ acilan_sandik: acilanSandik[k] })))
      .then(() => alert('Güncellendi'))
      .catch(err => alert(err.message));
  }

  add(e) {
    e.preventDefault();

    const value = this.fg.value;

    this.afDb.list(`/bolgeler`).push(value)
      .then(() => this.fg.reset())
      .catch(err => alert(err.message));
  }

}
