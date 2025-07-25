import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NfeRegimeService {
  private regimeSubject = new BehaviorSubject<string | null>(null);
  regime$ = this.regimeSubject.asObservable();

  setRegime(value: string) {
    this.regimeSubject.next(value);
  }
}
