import { Component, OnInit } from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {keyVal} from "../keyVal";
import {last, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-adaylar',
  templateUrl: './adaylar.component.html',
  styleUrls: ['./adaylar.component.sass']
})
export class AdaylarComponent implements OnInit {


  constructor(
    private afDb: AngularFireDatabase,
    private afSt: AngularFireStorage
  ) { }

  adaylar: Observable<any[]>;

  fg: FormGroup = new FormGroup({
    'name': new FormControl(''),
    'logo': new FormControl('')
  });

  ngOnInit() {
    this.adaylar = this.afDb.list('/adaylar').snapshotChanges().pipe(keyVal());
  }

  logoAdded(event) {
    const file = event.target.files[0];
    this.fg.get('logo').setValue(file);
  }

  remove(aday) {
    this.afDb.object(`/adaylar/${aday.$key}`).remove().catch((err) => alert(err.message));
  }

  uploadFile(file): Promise<string> {
    const filePath = 'aday/' + file.name;
    const fileRef = this.afSt.ref(filePath);
    const task = this.afSt.upload(filePath, file);
    return task.snapshotChanges().pipe(
      last(),
      switchMap(() => fileRef.getDownloadURL())
    ).toPromise();
  }

  add(e) {
    e.preventDefault();
    const value = this.fg.value;
    const file = value.logo as File;
    value.logo = '/aday/' + file.name;

    Promise.all([
      this.afDb.list(`/adaylar`).push(value),
      this.uploadFile(file)
    ])
      .then(() => {
        this.fg.reset();
      })
      .catch(err => alert(err.message));
  }
}
