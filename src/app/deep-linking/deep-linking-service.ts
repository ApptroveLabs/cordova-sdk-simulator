import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';

@Injectable({
  providedIn: 'root',
})
export class DeepLinkingService {
  private deepLinkSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private listenerSetupPromise: Promise<void> | null = null;

  constructor(private platform: Platform) {}

  listenForDeepLinks() {
    // Set up the listener for real Cordova/Capacitor URL opens.
    if (!this.listenerSetupPromise) {
      this.listenerSetupPromise = this.platform.ready().then(() => {
        App.addListener('appUrlOpen', (event: { url: string }) => {
          if (!event.url) {
            return;
          }

          this.deepLinkSubject.next(event.url);
        });
      });
    }

    return this.deepLinkSubject.asObservable();
  }

  emitDeepLink(url: string) {
    this.deepLinkSubject.next(url);
  }
}
