const fs = require('fs');
const path = require('path');
require('dotenv').config();

const targetPathDev = path.join(__dirname, '../src/environments/environment.ts');
const targetPathProd = path.join(__dirname, '../src/environments/environment.prod.ts');

const envConfigFile = `export interface Environment {
  production: boolean;
  androidAppTroveSdkKey: string;
  iosAppTroveSdkKey: string;
}

export const environment: Environment = {
  production: false,
  androidAppTroveSdkKey: '${process.env.ANDROID_APPTROVE_SDK_KEY || ""}',
  iosAppTroveSdkKey: '${process.env.IOS_APPTROVE_SDK_KEY || ""}',
};
`;

const envConfigFileProd = `export interface Environment {
  production: boolean;
  androidAppTroveSdkKey: string;
  iosAppTroveSdkKey: string;
}

export const environment: Environment = {
  production: true,
  androidAppTroveSdkKey: '${process.env.ANDROID_APPTROVE_SDK_KEY || ""}',
  iosAppTroveSdkKey: '${process.env.IOS_APPTROVE_SDK_KEY || ""}',
};
`;

// Ensure directories exist
const devDir = path.dirname(targetPathDev);
if (!fs.existsSync(devDir)) {
  fs.mkdirSync(devDir, { recursive: true });
}

fs.writeFileSync(targetPathDev, envConfigFile, 'utf8');
fs.writeFileSync(targetPathProd, envConfigFileProd, 'utf8');
console.log('Environment configuration files generated dynamically from .env successfully (without secret keys).');
