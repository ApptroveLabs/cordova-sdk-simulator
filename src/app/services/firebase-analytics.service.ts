import { Injectable } from '@angular/core';

declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class FirebaseAnalyticsService {

  constructor() { }

  /**
   * Set a user property in Firebase Analytics
   * @param name - The name of the user property
   * @param value - The value of the user property
   */
  async setUserProperty(name: string, value: string): Promise<void> {
    try {
      if (window.FirebaseAnalytics) {
        await window.FirebaseAnalytics.setUserProperty({ name, value });
        console.log(`Firebase Analytics: Set user property ${name} = ${value}`);
      } else {
        console.warn('Firebase Analytics not available - plugin disabled or not configured');
      }
    } catch (error) {
      console.error('Error setting Firebase user property:', error);
      // Don't throw - allow app to continue without Firebase
    }
  }
}
