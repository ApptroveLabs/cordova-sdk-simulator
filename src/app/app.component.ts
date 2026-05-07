import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppTroveCordovaPlugin, AppTroveConfig, AppTroveEnvironment, AppTroveEvent, AppTroveDeepLink } from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';
import { Platform, AlertController, MenuController, ToastController } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { environment } from '../environments/environment';
import { AdvertisingId } from '@capacitor-community/advertising-id';
import { DeferredDeeplinkService } from './services/deferred-deeplink.service';
import { FcmService } from './services/fcm.service';
import { ApnService } from './services/apn.service';
import { EcommerceService } from './services/ecommerce.service';
import { AppTroveEvents } from './utils/apptrove-events';
import { DeepLinkingService } from './deep-linking/deep-linking-service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isSplashVisible: boolean = true;
  isDeepLinkOpen: boolean = false;
  userEmail: string | null = null;

  constructor(
    private splashScreen: SplashScreen,
    private apptroveCordovaPlugin: AppTroveCordovaPlugin,
    private router: Router,
    private platform: Platform,
    private deferredDeeplinkService: DeferredDeeplinkService,
    private fcmService: FcmService,
    private apnService: ApnService,
    private alertController: AlertController,
    private menuController: MenuController,
    private ecommerceService: EcommerceService,
    private toastController: ToastController,
    private deepLinkingService: DeepLinkingService
  ) {
    this.platform.ready().then(() => {
      this.initializeApp();
    });
  }

  private initializeApp() {
    this.configureStatusBar();
    this.setupDeferredDeeplinkCallback();
    this.subscribeToNativeDeepLinks();
    this.initializeAppTroveSDK();

    this.ecommerceService.userEmail$.subscribe(email => {
      this.userEmail = email;
    });
  }

  private subscribeToNativeDeepLinks() {
    this.deepLinkingService.listenForDeepLinks().subscribe((url: string) => {
      if (!url) {
        return;
      }

      this.isDeepLinkOpen = true;
      this.handleDeepLinkFromUrl(url);
    });
  }

  private async configureStatusBar() {
    try {
      if (!this.platform.is('hybrid')) {
        return;
      }

      await StatusBar.setOverlaysWebView({ overlay: false });
      await StatusBar.setStyle({ style: Style.Light });
      await StatusBar.setBackgroundColor({ color: '#0f172a' });
    } catch (error) {
      console.warn('Unable to configure status bar:', error);
    }
  }

  private handleDeepLinkFromUrl(url: string) {
    try {
      const urlParams = new URL(url);
      const pathname = urlParams.pathname || '';
      const productId = urlParams.searchParams.get('product_id') || '';
      const quantity = urlParams.searchParams.get('quantity') || '';

      if (pathname.startsWith('/product/') || productId) {
        const routeProductId = pathname.startsWith('/product/') ? pathname.split('/').pop() || productId : productId;
        if (quantity) {
          this.router.navigate(['/cake-screen'], {
            queryParams: {
              productId: routeProductId,
              quantity,
              actionData: urlParams.searchParams.get('actionData'),
              dlv: urlParams.searchParams.get('dlv'),
              deeplink: '1',
            },
          });
        } else if (routeProductId) {
          this.router.navigate(['/product-detail', routeProductId], {
            queryParams: { deeplink: '1' },
          });
        }
        this.isSplashVisible = false;
      } else if (pathname.startsWith('/cake/')) {
        const cakeParts = pathname.split('/').filter(Boolean);
        const cakeId = cakeParts[1] || productId;
        const cakeQty = cakeParts[2] || quantity || '1';
        this.router.navigate(['/cake-screen'], {
          queryParams: {
            productId: cakeId,
            quantity: cakeQty,
            actionData: urlParams.searchParams.get('actionData'),
            dlv: urlParams.searchParams.get('dlv'),
            deeplink: '1',
          },
        });
        this.isSplashVisible = false;
      } else if (pathname === '/d') {
        if (quantity) {
          this.router.navigate(['/cake-screen'], {
            queryParams: {
              productId,
              quantity,
              actionData: urlParams.searchParams.get('actionData'),
              dlv: urlParams.searchParams.get('dlv'),
              deeplink: '1',
            },
          });
        } else if (productId) {
          this.router.navigate(['/product-detail', productId], {
            queryParams: { deeplink: '1' },
          });
        } else {
          this.checkInitialRoute();
        }
        this.isSplashVisible = false;
      } else {
        this.checkInitialRoute();
      }
    } catch (error) {
      console.error('Error parsing deep link URL:', error);
      this.checkInitialRoute();
    }
  }

  private async checkInitialRoute() {
    try {
      const seen = await firstValueFrom(this.ecommerceService.onboardingSeen$);
      if (!seen) {
        this.router.navigate(['/onboarding']);
        return;
      }

      const email = await firstValueFrom(this.ecommerceService.userEmail$);
      if (!email) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/home']);
      }
    } finally {
      this.isSplashVisible = false;
      this.splashScreen.hide();
    }
  }

  private async initializeAppTroveSDK() {
    const sdkKey = this.platform.is('android') ? environment.androidAppTroveSdkKey : environment.iosAppTroveSdkKey;

    if (!sdkKey) {
      console.error('CRITICAL: AppTrove SDK Key is empty.');
      return;
    }

    // IMPORTANT: Get IDFA BEFORE SDK initialization (iOS only)
    if (this.platform.is('ios')) {
      console.log('Getting IDFA before SDK initialization...');
      await this.getAppleAdsToken();
    }

    const apptroveConfig = new AppTroveConfig(sdkKey, AppTroveEnvironment.Development);

    if (this.platform.is('ios')) {
      this.apptroveCordovaPlugin.updatePostbackConversion(10);
      this.apptroveCordovaPlugin.waitForATTUserAuthorization(20);
    }

    this.apptroveCordovaPlugin.initializeSDK(apptroveConfig)
      .then(() => {
        console.log('AppTrove SDK initialized');
        if (this.platform.is('android')) {
          this.fcmService.initializeFCM();
          void this.getAppleAdsToken();
        }
        if (this.platform.is('ios')) {
          this.apnService.initializeAPN();
          this.apptroveCordovaPlugin.subscribeAttributionlink();
        }
      })
      .catch(error => console.error('Error initializing AppTrove SDK:', error))
      .finally(() => {
        if (!this.isDeepLinkOpen) {
          setTimeout(() => {
            void this.checkInitialRoute();
          }, 3000);
        }
      });
  }

  private async getAppleAdsToken() {
    try {
      if (!this.platform.is('ios')) return;
      
      // Request tracking permission and get IDFA
      const trackingResult = await AdvertisingId.requestTracking();
      console.log('Tracking permission result:', trackingResult.value);
      
      if (trackingResult.value === 'Authorized') {
        const advertisingResult = await AdvertisingId.getAdvertisingId();
        const idfa = advertisingResult.id;
        if (idfa) {
          this.apptroveCordovaPlugin.updateAppleAdsToken(idfa);
          console.log('IDFA sent to SDK:', idfa);
        }
      } else {
        console.log('Tracking permission not authorized:', trackingResult.value);
      }
    } catch (error) {
      console.error("Error getting IDFA:", error);
    }
  }

  private setupDeferredDeeplinkCallback() {
    this.apptroveCordovaPlugin.setDeferredDeeplinkCallbackListener().subscribe({
      next: (deepLink: AppTroveDeepLink) => {
        const url = deepLink.url ?? '';
        if (!url) {
          return;
        }

        this.isDeepLinkOpen = true;
        this.deferredDeeplinkService.setDeferredDeeplink(url);
        this.handleDeepLinkFromUrl(url);
      },
      error: (error: any) => console.error("Error in deferred deeplink callback:", error)
    });
  }

  navigate(path: string) {
    this.router.navigate([path]);
    this.menuController.close('main-menu');
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Logout',
      message: 'Are you sure you want to logout?',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { 
          text: 'Logout', 
          handler: () => {
            const logoutEvent = new AppTroveEvent(AppTroveEvents.LOGOUT); 
            logoutEvent.setParam1(this.userEmail || 'guest');
            this.apptroveCordovaPlugin.trackEvent(logoutEvent);
            this.ecommerceService.setUserEmail(null);
            this.router.navigate(['/login']);
            this.menuController.close('main-menu');
          }
        }
      ]
    });
    await alert.present();
  }

  async shareApp() {
    try {
      const dynamicLink = await this.apptroveCordovaPlugin.createDynamicLink({
        templateId: 'wy23Px',
        link: 'https://trackier58.u9ilnk.me/download',
        domainUriPrefix: 'trackier58.u9ilnk.me',
        deepLinkValue: 'Home',
        socialMetaTagParameters: {
          title: 'Download Cordmarket',
          description: 'The best premium shopping app.',
        }
      });
      if (navigator.share) {
        await navigator.share({
          title: 'Cordmarket',
          text: 'Check out Cordmarket! The best premium shopping app.\nDownload now: https://trackier58.u9ilnk.me/download',
          url: dynamicLink
        });
      }
    } catch (e) {
      console.error('Error sharing app:', e);
    }
  }

  async showOrders() {
    const toast = await this.toastController.create({
      message: 'No past orders found.',
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
    this.menuController.close('main-menu');
  }

  async showPolicy(title: string) {
    const alert = await this.alertController.create({
      header: title,
      message: title === 'Privacy Policy' ? `
        Privacy Policy for Cordmarket

        1. Information We Collect
        We collect data through SDKs like Apptrove, CleverTap, and WebEngage to provide personalized features and track attribution.

        2. How we use your information
        We use the information we collect to provide, operate, maintain, improve, and expand our app.

        3. Data Safety
        We ensure your data is encrypted during transmission. You can request data deletion at any time by contacting support.
      ` : 'By using Cordmarket, you agree to comply with our e-commerce regulations.',
      buttons: ['Understood']
    });
    await alert.present();
    this.menuController.close('main-menu');
  }

  async showAbout() {
    const alert = await this.alertController.create({
      header: 'About Cordmarket',
      message: 'Cordmarket is a premium e-commerce platform offering the best products directly to you with top-tier user experience.\n\nVersion: 1.0.0 (Build 98)',
      buttons: ['Close']
    });
    await alert.present();
    this.menuController.close('main-menu');
  }

  async deleteAccount() {
    const alert = await this.alertController.create({
      header: 'Delete Account?',
      message: 'This action is permanent. All your order history and preferences will be permanently removed from our servers.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Permanently Delete',
          cssClass: 'danger',
          handler: () => {
            const delEvent = new AppTroveEvent(AppTroveEvents.ACCOUNT_DELETION);
            delEvent.setParam1(this.userEmail || 'unknown');
            this.apptroveCordovaPlugin.trackEvent(delEvent);
            this.ecommerceService.setUserEmail(null);
            this.router.navigate(['/login']);
            this.menuController.close('main-menu');
          }
        }
      ]
    });
    await alert.present();
  }
}
