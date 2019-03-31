import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from "rxjs";
import {AngularFireDatabase} from "@angular/fire/database";

@Pipe({
  name: 'document'
})
export class DocumentPipe implements PipeTransform {

  constructor(
    private afDb: AngularFireDatabase
  ) {

  }

  transform(value: any, args?: any): Observable<any> {
    return this.afDb.object(value).valueChanges();
  }

}
