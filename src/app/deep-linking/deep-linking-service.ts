import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DeepLinkingService {
  private deepLinkSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private platform: Platform) {}

  listenForDeepLinks() {
    // Set up the listener for deep links when the platform is ready
    this.platform.ready().then(() => {
      window.addEventListener('deepLink', (event: any) => {
        this.deepLinkSubject.next(event.detail.link);
      });
    });

    return this.deepLinkSubject.asObservable();
  }
}
