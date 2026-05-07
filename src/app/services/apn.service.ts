import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { AppTroveCordovaPlugin } from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';

@Injectable({
  providedIn: 'root'
})
export class ApnService {
  private readonly APN_TOKEN_KEY = 'apn_token';

  constructor(
    private platform: Platform,
    private apptroveCordovaPlugin: AppTroveCordovaPlugin
  ) {}

  /**
   * Initialize APN and handle token refresh for iOS
   * Similar to Android FCM but for Apple Push Notification service
   */
  async initializeAPN(): Promise<void> {
    try {
      // Only initialize on iOS
      if (!this.platform.is('ios')) {
        console.log('APN is only initialized on iOS platform');
        return;
      }

      console.log('Initializing APN for iOS...');

      // Request permission to receive push notifications
      const permStatus = await PushNotifications.requestPermissions();

      if (permStatus.receive === 'granted') {
        // Register with APNs
        await PushNotifications.register();

        // Listen for token registration
        PushNotifications.addListener('registration', (token: Token) => {
          console.log('APN Token received:', token.value);
          this.handleTokenRefresh(token.value);
        });

        // Listen for registration errors
        PushNotifications.addListener('registrationError', (error: any) => {
          console.error('Error on APN registration:', error);
        });

        console.log('APN initialized successfully');
      } else {
        console.warn('Push notification permission not granted on iOS');
      }
    } catch (error) {
      console.error('Error initializing APN:', error);
    }
  }

  /**
   * Handle token refresh - always send to AppTrove for uninstall tracking
   * This sends the APN device token to AppTrove for iOS uninstall tracking
   */
  private handleTokenRefresh(newToken: string): void {
    try {
      console.log('APN Token received, sending to AppTrove:', newToken);
      
      // Always send the APN token to AppTrove SDK
      this.apptroveCordovaPlugin.sendAPNToken(newToken);
      console.log('APN Token sent to AppTrove SDK successfully');

      // Store the token
      localStorage.setItem(this.APN_TOKEN_KEY, newToken);
    } catch (error) {
      console.error('Error handling APN token refresh:', error);
    }
  }

  /**
   * Manually get current APN token
   */
  async getCurrentToken(): Promise<string | null> {
    try {
      const storedToken = localStorage.getItem(this.APN_TOKEN_KEY);
      return storedToken;
    } catch (error) {
      console.error('Error getting current APN token:', error);
      return null;
    }
  }

  /**
   * Clear stored token (useful for testing or logout)
   */
  clearToken(): void {
    localStorage.removeItem(this.APN_TOKEN_KEY);
    console.log('APN token cleared from storage');
  }
}
