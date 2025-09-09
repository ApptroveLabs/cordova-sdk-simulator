import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { TrackierCordovaPlugin, TrackierConfig, TrackierEnvironment } from '@awesome-cordova-plugins/trackier/ngx';  // Ensure correct path

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Router } from '@angular/router';  // Import Router for navigation
import { DeferredDeeplinkService } from './services/deferred-deeplink.service';
import { FirebaseAnalyticsService } from './services/firebase-analytics.service';

@NgModule({
  declarations: [AppComponent],  // Keep only AppComponent here
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
  ],
  providers: [
    TrackierCordovaPlugin,
    SplashScreen,  // Add SplashScreen to providers
    Deeplinks,  // Ensure Deeplinks is imported if needed
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],  // Bootstrap with AppComponent
})
export class AppModule {
  constructor(
    private trackierCordovaPlugin: TrackierCordovaPlugin,
    private splashScreen: SplashScreen,  // Injected SplashScreen
    private router: Router,  // Inject Router for navigation
    private deferredDeeplinkService: DeferredDeeplinkService,
    private firebaseAnalytics: FirebaseAnalyticsService
  ) {
    // Initialize the Trackier SDK 
    this.initializeTrackierSDK();
  }

  // Method to initialize the Trackier SDK
  private initializeTrackierSDK() {
    const key = "ee9f21fb-5848-4ed9-8d9c-e4093e6d220c";  // Replace with your actual SDK key
    const trackierConfig = new TrackierConfig(key, TrackierEnvironment.Development);  // or Production as per your needs
    trackierConfig.setAppSecret("659fb6f1xxxxxxxa29d46c9", "9258fcdb-a7a7-xxxxx-xxxx-65835ed38407"); // Pass secretId and secretKey
    trackierConfig.setAndroidId("User Android Id 1234567890"); // Only for andorid device
    trackierConfig.setFacebookAppId("Your Facebook App id "); // Only for Android device or Android Sdk
    this.trackierCordovaPlugin.initializeSDK(trackierConfig).then(() => {
      console.log("Trackier SDK initialized successfully.");
      
      // Set Trackier ID as Firebase User Property
      this.trackierCordovaPlugin.getTrackierId()
        .then(val => this.firebaseAnalytics.setUserProperty("ct_objectId", val))
        .catch(e => console.log('error: ', e));
      
      // Set up deferred deep link callback FIRST
      this.setupDeferredDeeplinkCallback();
      
      
      // Then call parseDeepLink
      setTimeout(() => {

        // Pass user clicked url here for tesing add short url getting form apptrove pannel

        this.trackierCordovaPlugin.parseDeepLink("https://trackier58.u9ilnk.me/d/8X7iwyXsyA").then((result) => {
          console.log("parseDeepLink result:", result);
        }).catch((error) => {
          console.error("Error parsing deep link:", error);
        });
      }, 1000);
      
    }).catch((error) => {
      console.error("Error initializing Trackier SDK:", error);
    });
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
