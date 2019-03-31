import {Observable} from 'rxjs/internal/Observable';
import {SnapshotAction} from '@angular/fire/database';

export const keyVal = () => (source: Observable<SnapshotAction<any>[]>) => {
  return new Observable<any[]>(observer => {
    return source.subscribe({
      next(x) {
        observer.next(
          x.map(actions => Object.assign(actions.payload.val(), {$key: actions.key, $ref: actions.payload.ref}))
        );
      },
      error(err) {
        observer.error(err);
      },
      complete() {
        observer.complete();
      }
    });
  });
};
