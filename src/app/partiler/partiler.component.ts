import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from "rxjs";
import {finalize, last, map, switchMap} from "rxjs/operators";
import {keyVal} from "../keyVal";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-partiler',
  templateUrl: './partiler.component.html',
  styleUrls: ['./partiler.component.sass']
})
export class PartilerComponent implements OnInit {

  constructor(
    private afDb: AngularFireDatabase,
    private afSt: AngularFireStorage
  ) { }

  partiler: Observable<any[]>;

  fg: FormGroup = new FormGroup({
    'name': new FormControl(''),
    'alias': new FormControl(''),
    'title': new FormControl(''),
    'logo': new FormControl('')
  });

  ngOnInit() {
    this.partiler = this.afDb.list('/partiler').snapshotChanges().pipe(keyVal());
  }

  logoAdded(event) {
    const file = event.target.files[0];
    this.fg.get('logo').setValue(file);
  }

  remove(parti) {
    this.afDb.object(`/partiler/${parti.$key}`).remove().catch((err) => alert(err.message));
  }

  uploadFile(file): Promise<string> {
    const filePath = 'parti/' + file.name;
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
    value.logo = '/parti/' + file.name;

    Promise.all([
      this.afDb.list(`/partiler`).push(value),
      this.uploadFile(file)
    ])
      .then(() => this.fg.reset())
      .catch(err => alert(err.message));
  }

}
