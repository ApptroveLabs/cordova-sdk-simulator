import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { TrackierCordovaPlugin, TrackierConfig, TrackierEnvironment } from '@awesome-cordova-plugins/trackier/ngx';
import { Platform } from '@ionic/angular';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Plugins } from '@capacitor/core';
import { environment } from '../environments/environment'; // Ensure this file exists and contains trackierSdkKey

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
    private deeplinks: Deeplinks
  ) {
    this.platform.ready().then(() => {
      this.initializeApp();
    });
  }

  private initializeApp() {
    // Listen for deep links
    App['addListener']('appUrlOpen', (data: AppUrlOpenData) => {
      console.log('App URL Opened:', data);
      this.isDeepLinkOpen = true; // Mark as deep link opened
      this.handleDeepLinkFromUrl(data.url);
    });

    // Initialize other app features
    this.initializeDeepLinks();
    this.initializeTrackierSDK();
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
    const trackierConfig = new TrackierConfig(key, TrackierEnvironment.Development);

    this.trackierCordovaPlugin.initializeSDK(trackierConfig)
      .then(() => console.log('Trackier SDK initialized successfully.'))
      .catch((error) => console.error('Error initializing Trackier SDK:', error))
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
}
