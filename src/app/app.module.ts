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
    private router: Router  // Inject Router for navigation
  ) {
    // Initialize the Trackier SDK 
    this.initializeTrackierSDK();
  }

  // Method to initialize the Trackier SDK
  private initializeTrackierSDK() {
    const key = "ee9f21fb-5848-4ed9-8d9c-e4093e6d220c";  // Replace with your actual SDK key
    const trackierConfig = new TrackierConfig(key, TrackierEnvironment.Development);  // or Production as per your needs

    this.trackierCordovaPlugin.initializeSDK(trackierConfig).then(() => {
      console.log("Trackier SDK initialized successfully.");
    }).catch((error) => {
      console.error("Error initializing Trackier SDK:", error);

    });
  }
}
