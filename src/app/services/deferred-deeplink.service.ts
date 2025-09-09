import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeferredDeeplinkService {
  private deferredDeeplinkSubject = new BehaviorSubject<string>('');
  public deferredDeeplink$ = this.deferredDeeplinkSubject.asObservable();

  constructor() { }

  setDeferredDeeplink(url: string) {
    console.log('DeferredDeeplinkService: Setting deferred deeplink:', url);
    this.deferredDeeplinkSubject.next(url);
  }

  getDeferredDeeplink(): string {
    return this.deferredDeeplinkSubject.value;
  }
}
