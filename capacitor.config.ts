import type { CapacitorConfig } from '@capacitor/cli';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'Ionic_Simulator',
  webDir: 'www',
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,   // Duration for splash screen (in ms)
      launchAutoHide: false,      // Don't auto-hide, we handle it programmatically
      backgroundColor: "#ffffff", // Set background color (e.g., white)
      androidScaleType: "CENTER_CROP", // Adjust splash image scale on Android
    }
  }
};

export default config;
