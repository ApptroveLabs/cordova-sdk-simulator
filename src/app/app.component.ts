import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { TrackierCordovaPlugin, TrackierConfig, TrackierEnvironment, TrackierEncryptionType } from 'com.trackier.cordova_sdk/ionic-native/trackier/ngx';
import { Platform } from '@ionic/angular';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Plugins } from '@capacitor/core';
import { environment } from '../environments/environment';
import { AdvertisingId } from '@capacitor-community/advertising-id';
import { DeferredDeeplinkService } from './services/deferred-deeplink.service';
import { FcmService } from './services/fcm.service';
import { ApnService } from './services/apn.service';

const { App } = Plugins;

interface AppUrlOpenData {
  url: string;
}

interface DeepLinkData {
  productId: string;
  quantity: number;
  actionData?: any;
  dlv?: string;
}

interface DeepLinkMatchData {
  productId: string;
  quantity: string; // URL parameters are strings
  [key: string]: any; // Allow additional properties
}

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isSplashVisible: boolean = true;
  isDeepLinkOpen: boolean = false; // Track if the app is opened via deep link

  constructor(
    private splashScreen: SplashScreen,
    private trackierCordovaPlugin: TrackierCordovaPlugin,
    private router: Router,
    private platform: Platform,
    private deeplinks: Deeplinks,
    private deferredDeeplinkService: DeferredDeeplinkService,
    private fcmService: FcmService,
    private apnService: ApnService
  ) {
    this.platform.ready().then(() => {
      this.initializeApp();
    });
  }

  private initializeApp() {
    // Initialize Trackier SDK first
    this.initializeTrackierSDK();
    
    // Initialize deep links
    this.initializeDeepLinks();
    
    // Listen for deep links
    App['addListener']('appUrlOpen', (data: AppUrlOpenData) => {
      console.log('App URL Opened:', data);
      this.isDeepLinkOpen = true; // Mark as deep link opened
      this.handleDeepLinkFromUrl(data.url);
    });
  }

  private handleDeepLinkFromUrl(url: string) {
    try {
      const urlParams = new URL(url);
      const productId = urlParams.searchParams.get('product_id') || '';
      const quantity = parseInt(urlParams.searchParams.get('quantity') || '0', 10);

      if (productId && quantity > 0) {
        // Skip splash screen and navigate directly to the 'cake-screen'
        this.router.navigate(['/cake-screen'], {
          queryParams: { productId, quantity },
        });
        this.isSplashVisible = false;  // Hide splash screen immediately
      } else {
        // If no valid product/quantity found, navigate to home screen
        this.router.navigate(['/home']);
      }
    } catch (error) {
      console.error('Error parsing deep link URL:', error);
      this.router.navigate(['/home']);
    }
  }

  private initializeTrackierSDK() {
    const key = environment.trackierSdkKey; // Use key from environment file
    const trackierConfig = new TrackierConfig("XXXXXXXXXXXXXXXXXXXX", TrackierEnvironment.Development);

    // Android-specific configuration for encrypt your logs and header request 
    if (this.platform.is('android')) {
      // trackierConfig.setAppID("XXXXXXXX");
      // trackierConfig.setEncryptionKey("xxxxxxxxxxxxxx");
      // trackierConfig.setEncryptionType(TrackierEncryptionType.AES_GCM);
    }

            // iOS: Update conversion value
            if (this.platform.is('ios')) {
              this.trackierCordovaPlugin.updatePostbackConversion(10);
            }
    

    // iOS: Configure ATT timeout (should be called before initialization)
    if (this.platform.is('ios')) {
      this.trackierCordovaPlugin.waitForATTUserAuthorization(20);
    }

    this.trackierCordovaPlugin.initializeSDK(trackierConfig)
      .then(() => {

        // Android: Initialize FCM and handle token refresh automatically
        // Only sends token when it changes 
        if (this.platform.is('android')) {
          this.fcmService.initializeFCM();
        }

        // iOS: Initialize APN and handle token refresh for uninstall tracking
        // Only sends token when it changes (similar to FCM on Android)
        if (this.platform.is('ios')) {
          this.apnService.initializeAPN();
        }

        // iOS: Subscribe to attribution
        if (this.platform.is('ios')) {
          this.trackierCordovaPlugin.subscribeAttributionlink();
        }

        // Get Apple Ads Token and send to SDK (iOS only)
        if (this.platform.is('ios')) {
          this.getAppleAdsToken();
        }

        // Set up deferred deep link callback
        this.setupDeferredDeeplinkCallback();

        // Parse deep link for testing (optional)
        setTimeout(() => {
          // Pass user clicked url here for testing - add short url from Trackier panel
          this.trackierCordovaPlugin.parseDeepLink("https://trackier58.u9ilnk.me/d/8X7iwyXsyA")
            .then((result: any) => {
              console.log("parseDeepLink result:", result);
            })
            .catch((error: any) => {
              console.error("Error parsing deep link:", error);
            });
        }, 1000);
      })
      .catch((error: any) => console.error('Error initializing Trackier SDK:', error))
      .finally(() => {
        // Only show splash screen if the app is NOT opened via deep link
        if (!this.isDeepLinkOpen) {
          setTimeout(() => {
            this.isSplashVisible = false;
            this.splashScreen.hide();
            this.router.navigate(['/home']); // Navigate to home screen if not a deep link
          }, 2000); // 2 seconds delay
        }
      });
  }

  private initializeDeepLinks() {
    this.deeplinks.route({
      '/cake/:productId/:quantity': (data: DeepLinkMatchData) => {
        this.handleDeepLink({
          productId: data.productId,
          quantity: parseInt(data.quantity, 10),
          actionData: data['actionData'], // Access with bracket notation
          dlv: data['dlv'], // Access with bracket notation
        });
      },
    }).subscribe(
      (match) => {
        console.log('Deep Link Matched:', match);
      },
      (nomatch) => {
        console.warn('No matching deep link:', nomatch);
        this.router.navigate(['/home']);
      }
    );
  }

  private handleDeepLink(data: DeepLinkData) {
    const { productId, quantity, actionData, dlv } = data;

    // Directly navigate to cake-screen with deep link parameters
    this.router.navigate(['/cake-screen'], {
      queryParams: { productId, quantity, actionData, dlv },
    });
  }

  // Get Apple Ads Token and send to Trackier SDK
  private async getAppleAdsToken() {
    try {
      // Only run on iOS
      if (!this.platform.is('ios')) {
        console.log("Apple Ads Token only available on iOS");
        return;
      }

      console.log("Getting Apple Ads Token...");

      // First request tracking authorization
      const trackingResult = await AdvertisingId.requestTracking();

      if (trackingResult.value === 'Authorized') {
        // Permission granted, get the advertising ID
        const advertisingResult = await AdvertisingId.getAdvertisingId();
        const token = advertisingResult.id;

        console.log("Apple Ads Token received:", token);

        if (token) {
          this.trackierCordovaPlugin.updateAppleAdsToken(token);
          console.log("Apple Ads Token sent to Trackier SDK successfully");
        } else {
          console.log("No Apple Ads Token available");
        }
      } else {
        console.log("Tracking permission denied or restricted");
      }
    } catch (error) {
      console.error("Error getting Apple Ads Token:", error);
    }
  }

  // Set up deferred deep link callback
  private setupDeferredDeeplinkCallback() {
    try {
      console.log("Setting up deferred deep link callback...");

      this.trackierCordovaPlugin.setDeferredDeeplinkCallbackListener().subscribe({
        next: (url: string) => {
          console.log("DEFERRED DEEP LINK RECEIVED:", url);
          this.deferredDeeplinkService.setDeferredDeeplink(url);
        },
        error: (error: any) => {
          console.error("Error in deferred deeplink callback:", error);
        }
      });

      console.log("Deferred deep link callback set up successfully");
    } catch (error) {
      console.error("Error setting up deferred deeplink callback:", error);
    }
  }
}
