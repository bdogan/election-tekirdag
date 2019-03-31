import { Pipe, PipeTransform } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/storage";
import {Observable} from "rxjs";

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  constructor(
    private afSet: AngularFireStorage
  ) { }

  transform(value: any, args?: any): Observable<string> {
    return this.afSet.ref(value).getDownloadURL();
  }

}
