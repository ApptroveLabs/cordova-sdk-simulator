import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { PushNotifications, Token } from '@capacitor/push-notifications';
import { TrackierCordovaPlugin } from 'com.trackier.cordova_sdk/ionic-native/trackier/ngx';

@Injectable({
  providedIn: 'root'
})
export class FcmService {
  private readonly FCM_TOKEN_KEY = 'fcm_token';

  constructor(
    private platform: Platform,
    private trackierCordovaPlugin: TrackierCordovaPlugin
  ) {}

  /**
   * Initialize FCM and handle token refresh
   * Similar to Flutter: FirebaseMessaging.instance.onTokenRefresh.listen()
   */
  async initializeFCM(): Promise<void> {
    try {
      // Only initialize on Android (iOS uses APNS)
      if (!this.platform.is('android')) {
        console.log('FCM is only initialized on Android platform');
        return;
      }

      console.log('Initializing FCM...');

      // Request permission to receive push notifications
      const permStatus = await PushNotifications.requestPermissions();

      if (permStatus.receive === 'granted') {
        // Register with FCM
        await PushNotifications.register();

        // Listen for token registration
        PushNotifications.addListener('registration', (token: Token) => {
          console.log('FCM Token received:', token.value);
          this.handleTokenRefresh(token.value);
        });

        // Listen for token refresh (similar to Flutter's onTokenRefresh)
        PushNotifications.addListener('registrationError', (error: any) => {
          console.error('Error on FCM registration:', error);
        });

        console.log('FCM initialized successfully');
      } else {
        console.warn('Push notification permission not granted');
      }
    } catch (error) {
      console.error('Error initializing FCM:', error);
    }
  }

  /**
   * Handle token refresh - only send to Trackier if token has changed
   * Similar to Android: override fun onNewToken(token: String)
   */
  private handleTokenRefresh(newToken: string): void {
    try {
      // Get the previously stored token
      const storedToken = localStorage.getItem(this.FCM_TOKEN_KEY);

      // Check if token has changed
      if (storedToken !== newToken) {
        console.log('FCM Token changed or first time:', newToken);
        
        // Send the new token to Trackier SDK
        this.trackierCordovaPlugin.sendFcmToken(newToken);
        console.log('FCM Token sent to Trackier SDK successfully');

        // Store the new token
        localStorage.setItem(this.FCM_TOKEN_KEY, newToken);
      } else {
        console.log('FCM Token unchanged, not sending to Trackier SDK');
      }
    } catch (error) {
      console.error('Error handling FCM token refresh:', error);
    }
  }

  /**
   * Manually get current FCM token
   */
  async getCurrentToken(): Promise<string | null> {
    try {
      const storedToken = localStorage.getItem(this.FCM_TOKEN_KEY);
      return storedToken;
    } catch (error) {
      console.error('Error getting current FCM token:', error);
      return null;
    }
  }

  /**
   * Clear stored token (useful for testing or logout)
   */
  clearToken(): void {
    localStorage.removeItem(this.FCM_TOKEN_KEY);
    console.log('FCM token cleared from storage');
  }
}

