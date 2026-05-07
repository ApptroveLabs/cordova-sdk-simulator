import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.apptrove.cordmarket',
  appName: 'Cordmarket',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      launchAutoHide: false,
      backgroundColor: "#0f766e",
      androidScaleType: "CENTER_CROP",
    }
  }
};

export default config;
