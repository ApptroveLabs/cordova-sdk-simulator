import { Component, OnInit, OnDestroy } from '@angular/core';
import { AlertController, ToastController, IonicModule } from '@ionic/angular';
import { AppTroveCordovaPlugin, AppTroveEvent } from 'com.apptrove.cordova_sdk/ionic-native/apptrove/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DeferredDeeplinkService } from '../services/deferred-deeplink.service';

@Component({
  selector: 'app-dynamic-link',
  templateUrl: './dynamic-link.page.html',
  styleUrls: ['./dynamic-link.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DynamicLinkPage implements OnInit, OnDestroy {

  // Dynamic Link Creation - Results
  createdDynamicLink: string = '';
  testResult: string = '';
  deferredDeeplinkResult: string = '';
  isLoading: boolean = false;
  private deferredDeeplinkSubscription?: Subscription;

  constructor(
    private apptrove: AppTroveCordovaPlugin,
    private alertController: AlertController,
    private toastController: ToastController,
    private deferredDeeplinkService: DeferredDeeplinkService
  ) { }

  ngOnInit() {
    this.initializePlugin();
    // Listen to deferred deeplink from service
    this.setupDeferredDeeplinkListener();
  }

  async initializePlugin() {
    try {
      // Check if plugin is available
      if (!this.apptrove) {
        await this.showToast('AppTrove plugin not available');
        return;
      }
      await this.showToast('Dynamic Link features ready!');
    } catch (error) {
      await this.showToast('Error initializing: ' + error);
    }
  }

  // Create Dynamic Link - Using actual SDK method
  async createDynamicLink() {
    try {
      this.isLoading = true;
      this.createdDynamicLink = '';
      
      // Check if plugin is available before calling
      if (!this.apptrove) {
        this.createdDynamicLink = 'Plugin not installed - Cannot create dynamic link';
        await this.showToast('AppTrove plugin not available');
        return;
      }
      
      // Hardcoded configuration for dynamic link creation
      const dynamicLinkConfig = {
        templateId: 'wy23Px',
        link: 'https://trackier58.u9ilnk.me',
        domainUriPrefix: 'trackier58.u9ilnk.me',
        deepLinkValue: 'CakeActivity',
        androidParameters: {
          redirectLink: 'https://play.google.com/store/apps/details?id=com.yourapp'
        },
        iosParameters: {
          redirectLink: 'https://apps.apple.com/app/yourapp/id123456789'
        },
        desktopParameters: {
          redirectLink: 'https://yourapp.com'
        },
        sdkParameters: {
          product_id: 'chocochip',
          quantity: '2',
        },
        socialMetaTagParameters: {
          title: 'Your Title',
          description: 'Your Description',
          imageLink: 'https://yourapp.com/app-icon.png'
        },
        attributionParameters: {
          channel: 'my_channel',
          campaign: 'sanu',
          mediaSource: 'at_invite',
          p1: 'param1_value',
          p2: 'param2_value',
          p3: 'param3_value',
          p4: 'param4_value',
          p5: 'param5_value'
        }
      };
      
      // Call the actual SDK method
      this.createdDynamicLink = await this.apptrove.createDynamicLink(dynamicLinkConfig);
      await this.showToast('Dynamic link created successfully!');
      console.log('Dynamic link created:', this.createdDynamicLink);
    } catch (error) {
      console.error('Error creating dynamic link:', error);
      this.createdDynamicLink = 'Error: ' + error;
      await this.showToast('Error creating dynamic link: ' + error);
    } finally {
      this.isLoading = false;
    }
  }

  // Resolve Deep Link URL - Using actual SDK method
  async testProvidedLink() {
    try {
      this.isLoading = true;
      this.testResult = '';
      
      // Hardcoded URL to resolve
      const urlToResolve = 'https://trackier58.u9ilnk.me/d/NKmWH9E7b1';
      
      // Check if plugin is available before calling
      if (!this.apptrove) {
        this.testResult = 'Plugin not installed - Cannot resolve deep link';
        await this.showToast('AppTrove plugin not available');
        return;
      }
      
      // Call the actual SDK method
      const result = await this.apptrove.resolveDeeplinkUrl(urlToResolve);
      
      // Show the result
      if (result && result.url) {
        this.testResult = `DEEP LINK RESOLVED:\nURL: ${result.url}\n\nFull Response: ${JSON.stringify(result, null, 2)}`;
        await this.showToast('Deep link resolved successfully!');
        console.log('Resolved deep link result:', result);
      } else {
        this.testResult = `No URL returned from resolver\nFull Response: ${JSON.stringify(result, null, 2)}`;
        await this.showToast('No URL returned from resolver');
      }
    } catch (error) {
      this.testResult = 'Error resolving deep link: ' + error;
      await this.showToast('Error resolving deep link: ' + error);
      console.error('Error resolving deep link:', error);
    } finally {
      this.isLoading = false;
    }
  }

  // Show toast message
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom'
    });
    await toast.present();
  }

  // Setup Deferred Deep Link Listener (from service)
  private setupDeferredDeeplinkListener() {
    try {
      // Listen to deferred deeplink from the service
      this.deferredDeeplinkSubscription = this.deferredDeeplinkService.deferredDeeplink$.subscribe({
        next: (url: string) => {
          if (url) {
            this.deferredDeeplinkResult = url;
            this.showToast('Deferred deep link received!');
            console.log('Deferred deep link received in page:', url);
          }
        },
        error: (error: any) => {
          console.error('Error in deferred deeplink service subscription:', error);
        }
      });
      
      console.log('Deferred deeplink service listener set up');
    } catch (error) {
      console.error('Error setting up deferred deeplink service listener:', error);
    }
  }

  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      await this.showToast('Copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      await this.showToast('Error copying to clipboard');
    }
  }

  ngOnDestroy() {
    // Clean up subscription when component is destroyed
    if (this.deferredDeeplinkSubscription) {
      this.deferredDeeplinkSubscription.unsubscribe();
    }
  }
}
