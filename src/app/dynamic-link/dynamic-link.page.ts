import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController, IonicModule } from '@ionic/angular';
import { TrackierCordovaPlugin, TrackierEvent } from '@awesome-cordova-plugins/trackier/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-link',
  templateUrl: './dynamic-link.page.html',
  styleUrls: ['./dynamic-link.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DynamicLinkPage implements OnInit {

  // Dynamic Link Creation - Results
  createdDynamicLink: string = '';
  testResult: string = '';
  isLoading: boolean = false;

  constructor(
    private trackier: TrackierCordovaPlugin,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.initializePlugin();
  }

  async initializePlugin() {
    try {
      // Check if plugin is available
      if (!this.trackier) {
        await this.showToast('Trackier plugin not available');
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
      if (!this.trackier) {
        this.createdDynamicLink = 'Plugin not installed - Cannot create dynamic link';
        await this.showToast('Trackier plugin not available');
        return;
      }
      
      // Hardcoded configuration for dynamic link creation
      const dynamicLinkConfig = {
        templateId: 'M5Osa2',
        link: 'https://testdeeplink',
        domainUriPrefix: 'https://trackier59.u9ilnk.me',
        deepLinkValue: 'MyMainactivity',
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
          utm_source: 'demo',
          utm_medium: 'app',
          utm_campaign: 'dynamic_link_test'
        },
        socialMetaTagParameters: {
          title: 'Check out this amazing app!',
          description: 'Download our app and get amazing features',
          imageLink: 'https://yourapp.com/app-icon.png'
        },
        attributionParameters: {
          channel: 'social',
          campaign: 'summer_sale',
          mediaSource: 'facebook',
          p1: 'param1_value',
          p2: 'param2_value',
          p3: 'param3_value',
          p4: 'param4_value',
          p5: 'param5_value'
        }
      };
      
      // Call the actual SDK method
      this.createdDynamicLink = await this.trackier.createDynamicLink(dynamicLinkConfig);
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
      const urlToResolve = 'https://trackier58.u9ilnk.me/d/8X7iwyXsyA';
      
      // Check if plugin is available before calling
      if (!this.trackier) {
        this.testResult = 'Plugin not installed - Cannot resolve deep link';
        await this.showToast('Trackier plugin not available');
        return;
      }
      
      // Call the actual SDK method
      const result = await this.trackier.resolveDeeplinkUrl(urlToResolve);
      
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

  // Copy to clipboard
  async copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      await this.showToast('Copied to clipboard!');
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      await this.showToast('Error copying to clipboard');
    }
  }
}
