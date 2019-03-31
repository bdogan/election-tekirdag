import { Pipe, PipeTransform } from '@angular/core';
import {Observable} from "rxjs";

@Pipe({
  name: 'secure'
})
export class SecurePipe implements PipeTransform {

  transform(value: Observable<any>, args?: any): any {
    return new Observable<string>((observer) => {
      // This is a tiny blank image
      observer.next('data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==');

      value.subscribe(observer);

      return {unsubscribe() {  }};
    });
  }

}
